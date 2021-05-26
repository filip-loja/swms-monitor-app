<template>
	<q-card
		flat
		bordered
		class="swms-bin-tile text-center q-pa-sm cursor-pointer non-selectable"
		:class="[isSelected ? 'bg-orange-1' : '']"
		@click="selectBin"
		@click.shift="viewDetails"
	>
		<div class="row">
			<div class="col">
				<div class="text-bold">{{ model.binId }}</div>
				<div><swms-badge :value="model.type" /></div>
			</div>
			<div class="col">
				<q-circular-progress
					show-value
					size="47px"
					font-size="12px"
					:thickness="0.25"
					:value="fullnessValue"
					:color="fullnessColor"
					track-color="grey-3"
					center-color="white"
				>
					{{ fullnessValue }}%
				</q-circular-progress>
			</div>
		</div>
		<hr class="swms-hr" />
		<div class="row">
			<div class="col">
				<div>{{ valueSmoke }}%</div>
				<div class="text-caption text-weight-light" style="margin-top: -3px"><small>Smoke</small></div>
			</div>
			<div class="col">
				<div>{{ valueTilt }}%</div>
				<div class="text-caption text-weight-light" style="margin-top: -3px"><small>Tilt</small></div>
			</div>
		</div>
	</q-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BinDetail } from '../store/store'
import SwmsBadge from 'components/SwmsBadge.vue'
export default Vue.extend({
	name: 'SwmsBinTile',
	components: { SwmsBadge },
	props: {
	  model: { type: Object as PropType<BinDetail>, required: true }
	},
	data () {
	  return {
      fullnessValue: 22,
			valueSmoke: 0,
			valueTilt: 0,
		}
	},
	computed: {
		isSelected (): boolean {
      return this.$store.getters['selectedBins'].includes(this.model.binId)
		},
    fullnessColor (): 'positive' | 'warning' | 'negative' {
      if (this.fullnessValue <= 33) return 'positive'
      if (this.fullnessValue <= 66) return 'warning'
      return 'negative'
    }
	},
	methods: {
    selectBin (e: MouseEvent) {
      if (e.shiftKey) return
      if (this.isSelected) {
        this.$store.commit('REMOVE_SELECTED_BIN', this.model.binId)
			} else {
        this.$store.commit('ADD_SELECTED_BIN', this.model.binId)
			}
    },
    viewDetails (e: Event) {
      e.preventDefault()
      void this.$store.dispatch('openDrawer', this.model.binId)
			return false
    }
	}
})
</script>

<style scoped lang="scss">

	.swms-bin-tile {
			&:hover {
				border-color: $primary;
				box-shadow: 0 0 2px $primary !important;
			}
	}

</style>
