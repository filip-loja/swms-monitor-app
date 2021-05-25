<template>
	<q-dialog
		v-model="state"
		maximized
		transition-show="slide-up"
		transition-hide="slide-down"
		@before-hide="onDialogClosed"
	>
		<q-card>
			<q-bar class="bg-primary text-white">
				<q-badge v-if="currentPosition" color="blue-grey-1" :label="currentPosition" class="swms-position-badge" />
				<q-space />
				<q-btn dense flat icon="close" v-close-popup>
					<q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
				</q-btn>
			</q-bar>

			<div class="swms-map-dialog-inner">
				<swms-azure-map @selected="onPointSelected" @move="onMapMove" :input-position="inputPosition" />
				<div class="swms-check-btn" v-if="selectedPosition">
					<q-btn round color="positive" icon="check" @click="emitValue = true" v-close-popup />
				</div>
			</div>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsAzureMap from 'components/SwmsAzureMap.vue'
export default Vue.extend({
	name: 'SwmsMapDialog',
	components: { SwmsAzureMap },
	data () {
	  return {
	    state: false,
      maximizedToggle: false,
			renderMap: false,
			selectedPosition: null,
			currentPosition: null,
			emitValue: false,
			inputPosition: null,
		}
	},
	methods: {
	  show (payload: any) {
	    this.inputPosition = payload
	    this.state = true
		},
    onDialogClosed () {
	    if (this.emitValue) {
	    	this.$emit('selection', this.selectedPosition)
			}
			this.selectedPosition = null
			this.emitValue = false
		},
		onPointSelected (position: any) {
	    this.selectedPosition = position
		},
		onMapMove (position: string) {
	    this.currentPosition = position
		}
	},
	mounted () {
	  setTimeout(() => {
			this.renderMap = true
		}, 2500)
  }
})
</script>

<style scoped lang="scss">

	.swms-map-dialog-inner {
		display: block;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		min-height: 300px;
		min-width: 500px;
		width: 100vw;
		height: calc(100vh - 32px);
		position: relative;
		overflow: hidden;

		.swms-check-btn {
			display: table;
			position: absolute;
			right: 10px;
			bottom: 10px;
			z-index: 10000000;
		}
	}

	.swms-position-badge {
		font-family: monospace;
		font-size: 13px;
		color: black;
		padding: 4px 6px;
	}

</style>
