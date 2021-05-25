<template>
	<div class="swms-bin-table-wrapper swms-narrow q-pa-md">
		<table v-if="binItems.length">
			<tr>
				<th></th>
				<th>#</th>
				<th>Bin ID</th>
				<th>Type</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
			<swms-bin-table-row
				v-for="(item, index) in binItems"
				:key="item.binId"
				:index="index"
				:model="item"
				@view="viewDetails"
			/>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinDetail } from '../store/store'
import SwmsBinTableRow from 'components/SwmsBinTableRow.vue'
export default Vue.extend({
	name: 'SwmsBinTable',
	components: { SwmsBinTableRow },
	computed: {
    binItems (): BinDetail[] {
      return this.$store.state.binItems as BinDetail[]
    },
		selectedBins (): string[] {
      return this.$store.getters['selectedBins']
		}
	},
	methods: {
    viewDetails (bindId: string) {
      void this.$store.dispatch('openDrawer', bindId)
    },
	}
})
</script>

<style scoped lang="scss">

	.swms-bin-table-wrapper {

		table {
			border-collapse: collapse;
			width: 100%;
			tr + tr {
				border-top: 1px solid $grey-5;
			}

			th {
				text-align: center;
				padding: 3px 7px;
			}
		}
	}

</style>
