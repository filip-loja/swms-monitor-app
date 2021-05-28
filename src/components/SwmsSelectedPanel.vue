<template>
	<div class="swms-selected-bins q-px-md q-py-sm">
		<div class="row justify-between items-center">
			<div class="row items-center no-wrap">
				<div class="text-h6">Selected bins</div>&nbsp;
				<div>({{ selectedBinIds.length }})</div>
			</div>
			<div>
				<q-btn round flat dense icon="close" color="negative" @click="clearSelectedBins(false)" />
			</div>
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
			<swms-azure-map-main v-if="points.length" :offset="32" key="route-map" :points="points" calc-route @route-found="loadDirections" />
			<div class="swms-check-btn" v-if="directions">
				<q-btn round color="warning" icon="subject" @click="toggleDirectionDialog" />&nbsp;&nbsp;
				<q-btn round color="positive" icon="check" @click="clearSelectedBins(true)" v-close-popup />
			</div>
		</swms-map-dialog>

		<q-dialog v-model="directionDialog" transition-show="scale" transition-hide="scale">
			<q-card style="width: 700px">
				<q-card-section class="q-pb-xs">
					<div class="text-h6">Directions</div>
				</q-card-section>

				<hr class="swms-hr" />

				<q-card-section class="q-pt-none">
					<ol class="swms-directions">
						<li v-for="(item, index) in directions" :key="index">
							<span>{{ item.message }}</span>
							<ul>
								<li v-for="(msg, i) in item.items" :key="index + '-' + i">{{ msg }}</li>
							</ul>
						</li>
					</ol>
				</q-card-section>

				<hr class="swms-hr" />

				<q-card-actions align="right" class="q-pt-xs">
					<q-btn flat label="OK" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

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
	  	points: [],
      directions: null,
			directionDialog: false
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
      // @ts-ignore
			this.$refs.dialog.show()
		},
    loadDirections (payload: any) {
      this.directions = payload
    },
		toggleDirectionDialog () {
	    this.directionDialog = !this.directionDialog
		},
		clearSelectedBins (withTimeout: boolean) {
	    if (withTimeout) {
	    	setTimeout(() => {
	    		this.$store.commit('CLEAR_SELECTED_BINS')
				}, 500)
			} else {
        this.$store.commit('CLEAR_SELECTED_BINS')
			}
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

	.swms-check-btn {
		display: table;
		position: absolute;
		right: 10px;
		bottom: 10px;
		z-index: 10000000;
	}

	.swms-directions {
		padding-left: 20px;

		> li {
			font-weight: bold;
			padding-top: 10px;
		}

		ul {
			font-weight: normal;
			li {
				padding-bottom: 5px;
			}
		}
	}

</style>
