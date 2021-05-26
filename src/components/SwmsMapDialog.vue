<template>
	<q-dialog
		v-model="state"
		maximized
		transition-show="slide-up"
		transition-hide="slide-down"
	>
		<q-card>
			<q-bar class="bg-primary text-white">
				<q-space />
				<q-btn dense flat icon="close" v-close-popup>
					<q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
				</q-btn>
			</q-bar>

			<div class="swms-map-dialog-inner">
				<swms-azure-map :input-position="inputPosition" />
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
			renderMap: false,
			inputPosition: null,
		}
	},
	methods: {
	  show (payload: any) {
	    this.inputPosition = payload
	    this.state = true
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
	}

</style>
