<template>
	<div class="q-pa-md swms-narrow">
		<div class="text-h4">Reports</div>
		<hr class="swms-hr" />
		<q-list padding bordered class="rounded-borders" v-if="reports.length">

			<q-expansion-item
				dense-toggle
				expand-separator
				group="bins"
				v-for="report in reports"
				:key="report.id"
				:label="formatTimestamp(report._ts)"
			>
				<q-card style="border-top: 1px dashed #E0E0E0">
					<q-card-section>
						<div class="row">

							<div class="q-pr-md q-mr-md" style="flex: 1; border-right: 1px dashed #E0E0E0">
								{{ report.message }}
							</div>

							<div>
								<div class="row items-center">
									<div>{{ report.binId }}</div>&nbsp;&nbsp;
									<div><swms-badge :value="report.type"/></div>
								</div>
								<div class="text-center">
									<q-btn round flat color="negative" icon="delete" size="sm" @click="deleteReport(report.id, report.type)" />
									<q-btn round flat color="primary" icon="visibility" size="sm" @click="showBinDetail(report.binId)" />
								</div>
							</div>

						</div>
					</q-card-section>
				</q-card>
			</q-expansion-item>

		</q-list>
		<q-banner v-else class="bg-deep-orange-2 q-mt-md">
			<template v-slot:avatar>
				<q-icon name="sentiment_dissatisfied" color="negative" />
			</template>
			<div class="text-negative text-bold">
				No reports found.
			</div>
		</q-banner>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Report } from 'src/store/store'
import SwmsBadge from 'components/SwmsBadge.vue'
export default Vue.extend({
	name: 'PageReports',
	components: { SwmsBadge },
	computed: {
	  reports (): Report[] {
	    return this.$store.state.reports
		}
	},
	methods: {
	  formatTimestamp (value: number): string {
	    return (new Date(value * 1000)).toString().split('G')[0]
		},
		showBinDetail (binId: string) {
	    this.$store.dispatch('findBinById', binId)
				.then(() => this.$store.dispatch('openDrawer', binId))
				.catch(err => console.log(err.Message))
		},
		deleteReport (reportId: string, key: string) {
      this.$q.dialog({
        title: 'Confirm your action',
        message: 'Do you really wish to delete this report?',
        ok: { color: 'negative', flat: true },
        cancel: true,
        persistent: true
      }).onOk(() => {
        void this.$store.dispatch('deleteReport', { reportId, key })
      })
		}
	},
	mounted () {
	  void this.$store.dispatch('loadReports')
  }
})
</script>

<style scoped>

</style>
