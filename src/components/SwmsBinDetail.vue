<template>
	<div v-if="model">

		<q-banner v-if="alertFire" class="bg-deep-orange-2 q-mb-md">
			<template v-slot:avatar>
				<q-icon name="local_fire_department" color="negative" />
			</template>
			<div class="text-negative text-bold">
				Possible danger of fire!
			</div>
		</q-banner>

		<q-banner v-if="alertFlip" class="bg-deep-orange-2 q-mb-md">
			<template v-slot:avatar>
				<q-icon name="360" color="negative" />
			</template>
			<div class="text-negative text-bold">
				This bin appears to have been flipped over!
			</div>
		</q-banner>

		<div class="row q-mb-md q-gutter-md">
			<div class="col">
				<q-input :value="model.binId" readonly outlined dense bg-color="white" label="Smart Bin ID">
					<template v-slot:append>
						<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.binId)" />
					</template>
				</q-input>
				<div class="q-pt-md"></div>
				<q-input :value="model.type" readonly outlined dense bg-color="white" label="Waste type">
					<template v-slot:append>
						<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.type)" />
					</template>
				</q-input>
			</div>
			<div class="col row column justify-center items-center">
				<q-circular-progress
					show-value
					size="73px"
					font-size="14px"
					:thickness="0.25"
					:value="fullnessValueNum"
					:color="fullnessColor"
					track-color="grey-3"
				>
					{{ fullnessValueNum }}%
				</q-circular-progress>
				<div class="text-caption text-grey-9 q-pt-xs">Fullness</div>
			</div>
		</div>

		<div class="row q-gutter-md">
			<div class="col">
				<q-input :value="model.lat" outlined dense readonly bg-color="white" label="Latitude" type="number">
					<template v-slot:append v-if="model.lat">
						<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.lat)" />
					</template>
				</q-input>
			</div>
			<div class="col">
				<q-input :value="model.lon" outlined dense readonly bg-color="white" label="Longitude" type="number">
					<template v-slot:append v-if="model.lon">
						<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.lon)" />
					</template>
				</q-input>
			</div>
		</div>
		<div class="q-mb-md q-pt-xs">
			<a class="swms-link" @click="showOnMap">View on map</a>
		</div>

		<div>
			<hr class="swms-hr" />
			<div class="q-pt-sm"></div>
		</div>

		<div class="row text-center">
			<div class="col">
				<div class="swms-tel">{{ smokeValue || '-' }}<swms-telemetry-warning v-if="alertFire" message="Possible danger of fire!" /></div>
				<div class="text-caption text-weight-light" style="margin-top: -3px">Smoke</div>
			</div>
			<div class="col">
				<div class="swms-tel">{{ tiltValue || '-' }}<swms-telemetry-warning v-if="alertFlip" message="This bin appears to have been flipped over!" /></div>
				<div class="text-caption text-weight-light" style="margin-top: -3px">Tilt</div>
			</div>
		</div>

		<swms-map-dialog ref="map">
			<swms-azure-map :input-position="mapInputPosition" />
		</swms-map-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinDetail } from 'src/store/store'
import { copyToClipboard } from 'quasar'
import SwmsMapDialog from 'components/SwmsMapDialog.vue'
import SwmsAzureMap from 'components/SwmsAzureMap.vue'
import MixinTelemetry from 'src/mixins/MixinTelemetry'
import SwmsTelemetryWarning from 'components/SwmsTelemetryWarning.vue'

export default Vue.extend({
	name: 'SwmsDrawer',
	components: { SwmsMapDialog, SwmsAzureMap, SwmsTelemetryWarning },
	mixins: [MixinTelemetry],
	methods: {
		toClipboard (value: any) {
	    void copyToClipboard(value).then(() => {
	      this.$q.notify({
          progress: true,
          message: 'Copied to clipboard',
          timeout: 2500
        })
			})
		},
    showOnMap () {
		  // @ts-ignore
	    this.$refs.map.show()
		},
	},
	computed: {
	  binId (): string {
      return this.$store.state.activeBinId as string
		},
		model (): BinDetail {
	    return this.$store.state.binItems.find((item: BinDetail) => item.binId === this.binId)
		},
		fullnessColor (): 'positive' | 'warning' | 'negative' {
	    if (this.fullnessValueNum <= 33) return 'positive'
			if (this.fullnessValueNum <= 66) return 'warning'
	    return 'negative'
		},
		mapInputPosition (): any {
	    return {
        lat: this.model.lat,
        lon: this.model.lon
      }
		},
    fullnessValueNum (): number {
      // @ts-ignore
      return (this.myTelemetry && this.myTelemetry.fullness) || 0
    },
	}
})
</script>

<style scoped lang="scss">

	.swms-tel {
		font-size: 1.7em;
	}

</style>
