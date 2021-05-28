<template>
	<tr class="swms-bin-table-row" :class="[isSelected ? 'bg-orange-1' : '']">
		<td><q-checkbox @input="selectBin($event, model.binId)" :value="isSelected" /></td>
		<td>{{ index + 1 }}</td>
		<td><a class="swms-link" @click="viewDetails()">{{ model.binId }}</a></td>
		<td><swms-badge :value="model.type" /></td>
		<td>{{ fullnessValue }}%</td>
		<td>{{ smokeValue }}%</td>
		<td>{{ tiltValue }}%</td>
		<td>
			<q-btn round flat color="primary" icon="visibility" size="sm" @click="viewDetails()" />
		</td>
	</tr>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BinDetail } from '../store/store'
import SwmsBadge from 'components/SwmsBadge.vue'
export default Vue.extend({
	name: 'SwmsBinTableRow',
	components: { SwmsBadge },
	props: {
	  model: { type: Object as PropType<BinDetail>, required: true },
		index: { type: Number, required: true }
	},
	data () {
	  return {
	    fullnessValue: 22,
			smokeValue: 10,
			tiltValue: 5,
		}
	},
	computed: {
    selectedBins (): string[] {
      return this.$store.getters['selectedBins']
    },
		isSelected (): boolean {
      return this.selectedBins.includes(this.model.binId)
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
