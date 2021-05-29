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
					:value="fullnessValueNum"
					:color="fullnessColor"
					track-color="grey-3"
					center-color="white"
				>
					{{ fullnessValueNum }}%
				</q-circular-progress>
			</div>
		</div>
		<hr class="swms-hr" />
		<div class="row">
			<div class="col">
				<div>{{ smokeValue || '-' }}<swms-telemetry-warning v-if="alertFire" message="Possible danger of fire!" /></div>
				<div class="text-caption text-weight-light" style="margin-top: -3px"><small>Smoke</small></div>
			</div>
			<div class="col">
				<div>{{ tiltValue || '-' }}<swms-telemetry-warning v-if="alertFlip" message="This bin appears to have been flipped over!" /></div>
				<div class="text-caption text-weight-light" style="margin-top: -3px"><small>Tilt</small></div>
			</div>
		</div>
	</q-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BinDetail } from '../store/store'
import SwmsBadge from 'components/SwmsBadge.vue'
import MixinTelemetry from 'src/mixins/MixinTelemetry'
import SwmsTelemetryWarning from 'components/SwmsTelemetryWarning.vue'
export default Vue.extend({
	name: 'SwmsBinTile',
	components: { SwmsBadge, SwmsTelemetryWarning },
	mixins: [MixinTelemetry],
	props: {
	  model: { type: Object as PropType<BinDetail>, required: true }
	},
	computed: {
		isSelected (): boolean {
      return this.$store.getters['selectedBins'].includes(this.model.binId)
		},
    fullnessColor (): 'positive' | 'warning' | 'negative' {
		  if (this.fullnessValueNum <= 33) return 'positive'
			if (this.fullnessValueNum <= 66) return 'warning'
      return 'negative'
    },
    fullnessValueNum (): number {
      // @ts-ignore
      return (this.myTelemetry && this.myTelemetry.fullness) || 0
    },
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
