<template>
	<q-dialog v-model="filterDialogState" position="top" @hide="syncFilter">
		<q-card style="width: 100%; max-width: 450px">

			<q-card-section class="q-py-sm">
				<div class="text-h6">Filter smart bins</div>
			</q-card-section>

			<q-separator />

			<q-card-section class="row no-wrap">
				<div class="col">
					<div class="text-caption text-grey-7">Garbage types:</div>
					<q-option-group
						v-model="filterModel.type"
						:options="typeOptions"
						type="checkbox"
						color="primary"
					/>
				</div>
				<div class="col row items-stretch">
					<div>
						<div class="text-caption text-grey-7">Status</div>
						<q-option-group
							v-model="filterModel.status"
							:options="statusOptions"
							type="checkbox"
							color="primary"
						/>
					</div>
					<div class="row items-end" style="width: 95%">
						<q-input v-model="filterModel.pageSize" outlined dense bg-color="white" label="Page size" type="number" :min="1" style="width: 100%" />
					</div>
				</div>
			</q-card-section>

			<q-separator />

			<q-card-actions align="around">
				<q-btn flat no-caps color="primary" @click="onFilter">Filter</q-btn>
				<q-btn flat no-caps color="secondary" @click="onClear">Reset</q-btn>
				<q-btn flat no-caps color="negative" @click="onCancel">Cancel</q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinFilter, GenericOptionItem } from 'src/store/store'

const generateModel = (): BinFilter => {
  return {
    pageSize: 100,
		status: [] as any,
		type: [] as any
  }
}

export default Vue.extend({
	name: 'SwmsFilterDialog',
  data () {
    return {
      filterModel: {
        type: [],
        status: [],
				pageSize: 100
      }
    }
  },
	methods: {
	  onCancel () {
	    this.filterDialogState = false
		},
		onClear () {
	    this.filterModel = generateModel() as any
			void this.$store.dispatch('loadBins', this.filterModel)
      this.filterDialogState = false
		},
		onFilter () {
      void this.$store.dispatch('loadBins', this.filterModel)
      this.filterDialogState = false
		},
		syncFilter () {
	    const activeFilter = this.$store.state.binFilter
			this.filterModel = JSON.parse(JSON.stringify(activeFilter))
		}
	},
	computed: {
	  filterDialogState: {
	    get (): boolean {
	      return this.$store.state.filterDialogState as boolean
			},
			set (newValue: boolean): void {
	      this.$store.commit('SET_FILTER_DIALOG', newValue)
			}
		},
    typeOptions (): GenericOptionItem[] {
      return this.$store.getters['binTypeItems'] as GenericOptionItem[]
    },
    statusOptions (): GenericOptionItem[] {
      return this.$store.getters['binStatusItems'] as GenericOptionItem[]
    },
	}
})
</script>

<style scoped>

</style>
