<template>
	<div class="swms-selected-bins q-px-md q-py-sm">
		<div class="row justify-between items-center">
			<div class="text-h6">Selected bins:</div>
			<div>({{ selectedBinIds.length }})</div>
		</div>

		<div>
			<hr class="swms-hr" />
			<div class="q-pt-sm"></div>
		</div>

		<div>
			<swms-selected-bins-item
				v-for="id in selectedBinIds"
				:key="id"
				:id="id"
			/>
		</div>

		<div>
			<div class="q-pt-sm"></div>
			<hr class="swms-hr" />
			<div class="q-pt-sm"></div>
		</div>

		<div class="text-center">
			<q-btn color="primary" unelevated @click="calculateRoute">Calculate route</q-btn>
		</div>

		<swms-map-dialog ref="dialog">
			<swms-azure-map-main v-if="points.length" :offset="32" key="route-map" :points="points" calc-route />
		</swms-map-dialog>

	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsSelectedBinsItem from 'components/SwmsSelectedBinsItem.vue'
import SwmsMapDialog from 'components/SwmsMapDialog.vue'
import SwmsAzureMapMain from 'components/SwmsAzureMapMain.vue'
import { BinDetail } from 'src/store/store'
export default Vue.extend({
	name: 'SwmsSelectedPanel',
	components: { SwmsSelectedBinsItem, SwmsMapDialog, SwmsAzureMapMain },
	data () {
	  return {
	  	points: []
		}
	},
	computed: {
    selectedBinIds (): string[] {
      return this.$store.getters['selectedBins']
    },
	},
	methods: {
	  calculateRoute () {
	    this.points = this.$store.state.binItems.filter((binItem : BinDetail) => this.selectedBinIds.includes(binItem.binId))
			// const coordinates = points.map((binItem : BinDetail) => [binItem.lon, binItem.lat])

			// console.log(coordinates)
      // @ts-ignore
			this.$refs.dialog.show()
		}
	}
})
</script>

<style scoped lang="scss">

	.swms-selected-bins {
		display: block;
		width: 100%;
		min-height: calc(100vh - 100px);
		box-sizing: border-box;
		border-left: 1px solid $grey-5;
	}

</style>
