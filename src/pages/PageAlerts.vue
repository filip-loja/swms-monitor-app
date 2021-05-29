<template>
	<div class="swms-page-alert q-pa-md swms-narrow">
		<div class="text-h4">Alerts</div>
		<hr class="swms-hr" />
		<div class="q-pb-sm"></div>
		<q-banner v-if="!alertItems.length" class="bg-green-2">
			<template v-slot:avatar>
				<q-icon name="insert_emoticon" color="green-10" />
			</template>
			<div class="text-green-10 text-bold">
				No alerts found.
			</div>
		</q-banner>
		<table v-else>
			<tr>
				<th class="text-center">#</th>
				<th class="text-center">Type</th>
				<th class="text-left">Bin ID</th>
				<th class="text-left">Message</th>
				<th class="text-center">Action</th>
			</tr>
			<tr v-for="(alert, index) in alertItems" :key="index + '-' + alert.binId">
				<td class="text-center">{{ index + 1 }}</td>
				<td class="text-center text-bold">
					<q-icon v-if="alert.type === 'fire'" name="local_fire_department" color="negative" />
					<q-icon v-else name="360" color="blue-10" />
					<span :class="[alert.type === 'fire' ? 'text-negative' : 'text-blue-10']">
						{{ alert.type }}
					</span>
				</td>
				<td><a class="swms-link" @click="showBinDetail(alert.binId)">{{ alert.binId }}</a></td>
				<td>{{ alert.type === 'fire' ? 'Possible danger of fire!' : 'The bin appears to have been flipped over!' }}</td>
				<td class="text-center"><q-btn round flat color="primary" icon="visibility" size="sm" @click="showBinDetail(alert.binId)" /></td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinAlert } from 'src/store/store'
export default Vue.extend({
	name: 'PageAlerts',
	computed: {
	  alertItems (): BinAlert[] {
	    return this.$store.getters['alerts']
		}
	},
	methods: {
    showBinDetail (binId: string) {
      void this.$store.dispatch('openDrawer', binId)
    }
	}
})
</script>

<style scoped lang="scss">

	.swms-page-alert {

		table {
			border-collapse: collapse;
			width: 100%;
			tr + tr {
				border-top: 1px solid $grey-5;
			}

			th, td {
				padding: 3px 7px;
			}
		}
	}

</style>
