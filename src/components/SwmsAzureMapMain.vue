<template>
	<div class="map-wrapper" :style="{height: `calc(100vh - ${offset}px)`}">
		<div id="azure-map"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as atlas from 'azure-maps-control'
import * as atlasService from 'azure-maps-rest'
import config from 'src/config'
import { HtmlMarker } from 'azure-maps-control'
import { BinDetail } from 'src/store/store'
import { CalculateRouteDirectionsResponse } from 'azure-maps-rest'

interface Data {
	map: atlas.Map;
  dataSource: atlas.source.DataSource;
  layer: atlas.layer.SymbolLayer;
  markers: HtmlMarker[];
}

export default Vue.extend({
	name: 'SwmsAzureMapMain',
	props: {
    offset: { type: Number, required: true },
		points: { type: Array, default: (): any => ([]) },
		calcRoute: { type: Boolean, default: false }
	},
	data (): Data {
	  return {
			map: null,
			dataSource: null,
			layer: null,
			markers: null
		}
	},
	methods: {
		onReadyHandler () {
      const defaultCamera = {
        center: this.mapCenter,
				// @ts-ignore
        maxBounds: new atlas.data.BoundingBox(...this.mapBoundingBox),
      }
      this.map.sources.add(this.dataSource)
      this.map.layers.add(this.layer)

      this.map.layers.add(new atlas.layer.SymbolLayer(this.dataSource, null, {
        iconOptions: {
          image: ['get', 'icon'],
          allowOverlap: true
        },
        textOptions: {
          textField: ['get', 'title'],
          offset: [0, 1.2]
        },
        filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']]
      }))

			if (this.calcRoute) {
        this.map.layers.add(new atlas.layer.LineLayer(this.dataSource, null, {
          strokeColor: '#2272B9',
          strokeWidth: 5,
          lineJoin: 'round',
          lineCap: 'round'
        }), 'labels');
			}

      this.map.setCamera(defaultCamera)

      const station = new atlas.data.Feature(new atlas.data.Point(this.mapCenter), {
        title: 'Fire station',
        icon: 'pin-blue'
      })
      this.dataSource.add([station])

      this.generateMarkers()
      this.appendMarkers()
			this.attachMarkerEvents()
			this.calculateRoute()
		},
		generateMarkers () {
		  this.markers = []
      const colors = {
        'plastic': '#FECA18',
				'paper': '#13A8E1',
				'glass': '#75B73B',
				'metal': '#E61C29',
				'mixed': '#4E4C4A',
      }

			for (const point of this.points) {
        const marker = new atlas.HtmlMarker({
          // @ts-ignore
          color: colors[point.type],
          position: [point.lon, point.lat]
        })
        // @ts-ignore
        marker['properties'] = point
				this.markers.push(marker)
			}
		},
		appendMarkers () {
      for (const marker of this.markers) {
        this.map.markers.add(marker)
      }
		},
		onMarkerClick (e: any) {
      const payload: BinDetail = e.target.properties
			void this.$store.dispatch('openDrawer', payload.binId)
		},
    attachMarkerEvents () {
      for (let i = 0; i < this.markers.length; i++) {
        this.map.events.add('click', this.markers[i], this.onMarkerClick)
      }
		},
		detachMarkerEvents () {
      for (let i = 0; i < this.markers.length; i++) {
        this.map.events.remove('click', this.markers[i], this.onMarkerClick)
      }
		},
		calculateRoute () {
		  if (!this.calcRoute) return
      const coordinates = this.points.map((binItem : BinDetail) => [binItem.lon, binItem.lat])
			coordinates.unshift(this.mapCenter)
			coordinates.push(this.mapCenter)

			const subscriptionKeyCredential = new atlasService.SubscriptionKeyCredential(atlas.getSubscriptionKey())
      const pipeline = atlasService.MapsURL.newPipeline(subscriptionKeyCredential)
      const routeURL = new atlasService.RouteURL(pipeline)
			this.$store.commit('SET_LOADING', 1)
			// @ts-ignore
      routeURL.calculateRouteDirections(atlasService.Aborter.timeout(10000), coordinates, {instructionsType: 'text'})
        .then((directions: CalculateRouteDirectionsResponse) => {
          const data = directions.geojson.getFeatures()
          this.dataSource.add(data)
					const guidance = directions.routes[0].guidance.instructionGroups.map(item => ({
						message: item.groupMessage,
						items: directions.routes[0].guidance.instructions
							.slice(item.firstInstructionIndex, item.lastInstructionIndex + 1)
							// @ts-ignore
							.map(msg => msg.combinedMessage || msg.message)
					}))

					this.$emit('route-found', guidance)
        })
			.catch((e: any) => console.log(e))
			.finally(() => this.$store.commit('SET_LOADING', -1))
		}
	},
	computed: {
	  mapCenter (): number[] {
	    return this.$store.state.azureMapCenter
		},
		mapBoundingBox (): any {
	    return this.$store.state.azureMapMaxBounds
		}
	},
	mounted () {
	  console.log('map MOUNTED')
    this.map = new atlas.Map('azure-map', {
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: config.AZURE_MAP_KEY
      },
      enableAccessibility: false,
      showFeedbackLink: false,
      showLogo: false,
      language: 'en-US',
      minZoom: 10,
      maxZoom: 18,
      view: 'auto',
    })

    this.dataSource = new atlas.source.DataSource()
    this.layer = new atlas.layer.SymbolLayer(this.dataSource)
    this.map.events.add('ready', this.onReadyHandler)
    this.map.getCanvasContainer().style.cursor = 'default'
  },
	beforeDestroy () {
	  this.map.events.remove('ready', this.onReadyHandler)
		this.detachMarkerEvents()
    this.map.markers.clear()
    console.log('map DESTROYED')
  }
})
</script>

<style scoped lang="scss">

	.map-wrapper {
		display: block;
		width: 100%;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	#azure-map {
		display: block;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

</style>
