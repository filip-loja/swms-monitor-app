<template>
	<tr class="swms-bin-table-row" :class="[isSelected ? 'bg-orange-1' : '']">
		<td><q-checkbox @input="selectBin($event, model.binId)" :value="isSelected" /></td>
		<td>{{ index + 1 }}</td>
		<td><a class="swms-link" @click="viewDetails()">{{ model.binId }}</a></td>
		<td><swms-badge :value="model.type" /></td>
		<td>{{ fullnessValue || '-' }}<q-icon name="warning" color="negative" class="q-pl-xs q-pb-xs" v-if="alertFull"><q-tooltip>This bin is full</q-tooltip></q-icon></td>
		<td>{{ smokeValue || '-' }}<q-icon name="warning" color="negative" class="q-pl-xs q-pb-xs" v-if="alertFire"><q-tooltip>Possible danger of fire!</q-tooltip></q-icon></td>
		<td>{{ tiltValue || '-' }}<q-icon name="warning" color="negative" class="q-pl-xs q-pb-xs" v-if="alertFlip"><q-tooltip>This bin appears to have been flipped over!</q-tooltip></q-icon></td>
		<td>
			<q-btn round flat color="primary" icon="visibility" size="sm" @click="viewDetails()" />
		</td>
	</tr>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BinDetail, BinTelemetry } from '../store/store'
import SwmsBadge from 'components/SwmsBadge.vue'
export default Vue.extend({
	name: 'SwmsBinTableRow',
	components: { SwmsBadge },
	props: {
	  model: { type: Object as PropType<BinDetail>, required: true },
		index: { type: Number, required: true }
	},
	computed: {
    selectedBins (): string[] {
      return this.$store.getters['selectedBins']
    },
		isSelected (): boolean {
      return this.selectedBins.includes(this.model.binId)
		},
		myTelemetry (): BinTelemetry {
      const stream = this.$store.state.telemetry[this.model.binId]
      if (!stream || stream.length === 0) {
        return null
      }
      return stream[ stream.length - 1 ]
		},
		fullnessValue (): string {
      return this.myTelemetry && this.myTelemetry.fullness.toFixed(2) + '%'
		},
		smokeValue (): string {
      return this.myTelemetry && this.myTelemetry.smoke.toFixed(2) + '%'
		},
    tiltValue (): string {
      return this.myTelemetry && this.myTelemetry.tilt.toFixed(2) + '%'
    },
    alertFull (): boolean {
      return this.myTelemetry && this.myTelemetry.alertFull
		},
    alertFlip (): boolean {
      return this.myTelemetry && this.myTelemetry.alertFlip
		},
    alertFire (): boolean {
      return this.myTelemetry && this.myTelemetry.alertFire
		}
	},
	methods: {
    selectBin (add: boolean, id: string) {
      if (add) {
        this.$store.commit('ADD_SELECTED_BIN',id)
      } else {
        this.$store.commit('REMOVE_SELECTED_BIN', id)
      }
    },
    viewDetails () {
      this.$emit('view', this.model.binId)
		}
	}
})
</script>

<style scoped lang="scss">

	.swms-bin-table-row {
		td {
			text-align: center;
			padding: 3px 7px;
			width: 20%;
		}

		td:first-child,
		td:nth-child(2),
		td:last-child {
			width: 1px;
			white-space: nowrap;
		}
	}

</style>
