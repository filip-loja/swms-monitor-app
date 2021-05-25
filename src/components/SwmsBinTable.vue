<template>
	<div class="swms-bin-table-wrapper q-pa-md">
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
		<q-banner v-if="showBanner" class="bg-deep-orange-2">
			<template v-slot:avatar>
				<q-icon name="sentiment_dissatisfied" color="negative" />
			</template>
			<div class="text-negative text-bold">
				No smart binds found. Try changing settings of the filter.
			</div>
		</q-banner>
		<div>
			{{ selectedBins }}
		</div>
		<div class="text-center full-width" v-if="hasMore">
			<br />
			<q-btn flat color="primary" @click="loadMore">Load more</q-btn>
		</div>
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
    hasMore (): boolean {
      return !!this.$store.state.nextToken
    },
		showBanner (): boolean {
      return this.binItems.length === 0 && this.$store.state.loading <= 0
		},
		selectedBins (): string[] {
      return this.$store.getters['selectedBins']
		}
	},
	methods: {
    loadMore () {
      void this.$store.dispatch('loadBins')
    },
    viewDetails (bindId: string) {
      void this.$store.dispatch('openDrawer', bindId)
    },
	},
  mounted () {
    this.loadMore()
  }
})
</script>

<style scoped lang="scss">

	.swms-bin-table-wrapper {
		display: block;
		box-sizing: border-box;
		width: 100%;
		max-width: 700px;

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
