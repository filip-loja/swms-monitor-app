<template>
	<div id="azure-map"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as atlas from 'azure-maps-control'
import config from 'src/config'

interface Data {
	map: atlas.Map;
  dataSource: atlas.source.DataSource;
  layer: atlas.layer.SymbolLayer
}

export default Vue.extend({
	name: 'SwmsAzureMap',
	props: {
	  inputPosition: { type: Object, default: null }
	},
	data (): Data {
	  return {
			map: null,
			dataSource: null,
			layer: null
		}
	},
	methods: {
		onReadyHandler () {
      const defaultCamera = {
        center: this.hasInitialPoint ? [this.inputPosition.lon, this.inputPosition.lat] : [18.620, 48.771],
        maxBounds: new atlas.data.BoundingBox([18.591718, 48.759056], [18.652761, 48.792376])
      }
      this.map.sources.add(this.dataSource)
      this.map.layers.add(this.layer)
      this.map.setCamera(defaultCamera)

			if (this.hasInitialPoint) {
        const point = new atlas.data.Feature(new atlas.data.Point([this.inputPosition.lon, this.inputPosition.lat]))
        this.dataSource.add([point])
			}
		}
	},
	computed: {
	  hasInitialPoint (): boolean {
	    return !!this.inputPosition && !!this.inputPosition.lat && !!this.inputPosition.lon
		}
	},
	mounted () {
    this.map = new atlas.Map('azure-map', {
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: config.AZURE_MAP_KEY
      },
      enableAccessibility: false,
      showFeedbackLink: false,
      showLogo: false,
      language: 'en-US',
      minZoom: 15,
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
  }
})
</script>

<style scoped>

	#azure-map {
		display: block;
		width: 100vw;
		height: calc(100vh - 32px);
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

</style>
