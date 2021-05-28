<template>
	<q-card square>
		<div class="row justify-between q-py-xs q-pl-sm q-pr-xs q-mb-sm">
			<div class="row items-center">
				<div class="text-bold"><a class="swms-link" @click="showDetail">{{ id }}</a></div>
				&nbsp;&nbsp;
				<swms-badge :value="model.type" />
			</div>
			<div>
				<q-btn round flat dense icon="close" color="negative" @click="removeFromSelection" />
			</div>
		</div>
	</q-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinDetail } from '../store/store'
import SwmsBadge from 'components/SwmsBadge.vue'
export default Vue.extend({
	name: 'SwmsSelectedBinsItem',
	components: { SwmsBadge },
	props: {
	  id: { type: String, required: true }
	},
	computed: {
	  model (): BinDetail {
	    return this.$store.state.binItems.find((item: BinDetail) => item.binId === this.id)
		}
	},
	methods: {
	  removeFromSelection () {
      void this.$store.commit('REMOVE_SELECTED_BIN', this.id)
		},
		showDetail () {
      void this.$store.dispatch('openDrawer', this.id)
		}
	}
})
</script>

<style scoped>

</style>
