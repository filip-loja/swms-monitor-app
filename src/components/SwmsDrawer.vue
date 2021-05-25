<template>
	<div>
		<q-drawer
			:value="drawerState"
			@input="() => null"
			show-if-above
			bordered
			content-class="bg-grey-1"
			side="right"
			:width="600"
			no-swipe-open
			no-swipe-close
			behavior="mobile"
			no-swipe-backdrop
			persistent
			@hide="onDrawerHidden"
			@before-show="onDrawerStart"
		>
			<div class="q-px-md q-py-sm swms-drawer" v-if="model">
				<div>

					<div class="row justify-between items-center">
						<div class="text-h5">{{ drawerTitle }}</div>
						<div>
							<q-btn round flat icon="close" color="negative" @click="onCancel" />
						</div>
					</div>

					<hr />
					<div class="q-pt-sm"></div>

					<div class="row q-mb-lg q-gutter-md">
						<div class="col" v-if="!inCreateMode">
							<q-input v-model="model.binId" readonly outlined dense bg-color="white" label="Smart Bin ID">
								<template v-slot:append>
									<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.binId)" />
								</template>
							</q-input>
						</div>
						<div class="col">
							<q-select v-model="model.type" outlined dense bg-color="white" :options="typeOptions" label="Type" />
						</div>
					</div>

					<div class="row q-gutter-md">
						<div class="col">
							<q-input v-model="model.lat" outlined dense bg-color="white" label="Latitude" type="number">
								<template v-slot:append v-if="model.lat">
									<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.lat)" />
								</template>
							</q-input>
						</div>
						<div class="col">
							<q-input v-model="model.lon" outlined dense bg-color="white" label="Longitude" type="number">
								<template v-slot:append v-if="model.lon">
									<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.lon)" />
								</template>
							</q-input>
						</div>
					</div>
					<div class="q-mb-md">
						<a class="swms-link" @click="selectFromMap">Select on map</a>
					</div>

					<div v-if="!inCreateMode" class="q-mb-md">
						<q-input v-model="model.connectionString" outlined dense bg-color="white" label="Connection string" readonly>
							<template v-slot:append>
								<q-btn round flat size="sm" icon="content_paste" @click="toClipboard(model.connectionString)" />
							</template>
						</q-input>
						<p class="text-caption text-grey-7">Use this string to pair the smart bin with the system. </p>
					</div>

					<div v-if="!inCreateMode" class="q-mb-lg">
						<p class="q-mb-none text-grey-7">Device status</p>
						<q-btn-toggle
							v-model="model.status"
							@input="changeStatus"
							spread
							no-caps
							unelevated
							toggle-color="primary"
							color="blue-1"
							text-color="primary"
							size="md"
							:options="statusOptions"
						/>
					</div>

	<!--				<q-select-->
	<!--					v-model="model.district"-->
	<!--					label="Districts"-->
	<!--					outlined-->
	<!--					dense-->
	<!--					bg-color="white"-->
	<!--					use-input-->
	<!--					use-chips-->
	<!--					multiple-->
	<!--					hide-dropdown-icon-->
	<!--					input-debounce="0"-->
	<!--					new-value-mode="add-unique"-->
	<!--					class="q-mb-lg"-->
	<!--				/>-->
				</div>

				<div>
					<hr />
					<div class="row q-gutter-md justify-center">
						<div class="col-4"><q-btn @click="onSave" no-caps flat color="positive" style="width: 100%">{{ submitBtnTitle }}</q-btn></div>
						<div class="col-4"><q-btn @click="onCancel" no-caps flat color="negative" style="width: 100%">Close</q-btn></div>
					</div>
				</div>

			</div>
		</q-drawer>
		<swms-map-dialog ref="map" @selection="processSelection" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinDetail, GenericOptionItem, TypeBinStatus } from 'src/store/store'
import { copyToClipboard } from 'quasar'
import SwmsMapDialog from 'components/SwmsMapDialog.vue'

const generateModel = (): BinDetail => {
  return {
    district: [],
		type: null,
		lat: null,
		lon: null
	}
}

export default Vue.extend({
	name: 'SwmsDrawer',
	components: { SwmsMapDialog },
	data () {
	  return {
	    model: null
		}
	},
	methods: {
	  onCancel (): void {
	    void this.$store.dispatch('closeDrawer')
		},
		onSave (): void {
			const payload: BinDetail = {
			  binId: this.binId,
	      type: this.model.type && this.model.type.value,
				lat: this.model.lat,
				lon: this.model.lon,
				district: this.model.district
			}
			if (this.inCreateMode) {
			  delete payload.binId
				void this.$store.dispatch('createBin', payload)
			} else {
			  void this.$store.dispatch('updateBinDetails', payload)
			}
		},
    onDrawerStart (): void {
	    if (this.inCreateMode) {
	      this.model = generateModel()
			} else {
	      this.model = JSON.parse(JSON.stringify(this.$store.state.binItems.find((item: BinDetail) => item.binId === this.binId)))
				this.model.type = {
          label: this.model.type.charAt(0).toUpperCase() + this.model.type.slice(1),
					value: this.model.type
				}
				if (this.model && !this.model.connectionString) {
				  void this.$store.dispatch('loadConnectionString', this.binId)
						.then(str => this.$set(this.model, 'connectionString', str))
				}
			}
	    if (!this.model) {
        void this.$store.dispatch('closeDrawer')
			}
		},
    onDrawerHidden (): void {
	    this.model = null
		},
		toClipboard (value: any) {
	    void copyToClipboard(value).then(() => {
	      this.$q.notify({
          progress: true,
          message: 'Copied to clipboard',
          timeout: 2500
        })
			})
		},
		changeStatus (newStatus: TypeBinStatus) {
	    const payload = {
	      binId: this.binId,
				status: newStatus
			}
			void this.$store.dispatch('updateBinStatus', payload)
		},
    selectFromMap () {
	    const payload = {
	      lat: this.model.lat,
				lon: this.model.lon
			}
	    // @ts-ignore
	    this.$refs.map.show(payload)
		},
    processSelection (payload: any) {
	    this.model.lat = payload.lat
	    this.model.lon = payload.lon
		}
	},
	computed: {
	  binId (): string {
      return this.$store.state.activeBinId as string
		},
		inCreateMode (): boolean {
	    return this.binId === null
		},
	  drawerState (): boolean {
	    return this.$store.state.drawerState as boolean
		},
		drawerTitle (): string {
	    return this.inCreateMode ? 'Create smart bin' : `Smart bin: ${this.binId}`
		},
		submitBtnTitle (): string {
      return this.inCreateMode ? 'Create' : 'Save'
		},
		statusOptions (): GenericOptionItem[] {
	    return this.$store.getters['binStatusItems'] as GenericOptionItem[]
		},
		typeOptions (): GenericOptionItem[] {
      return this.$store.getters['binTypeItems'] as GenericOptionItem[]
		}
	}
})
</script>

<style scoped>

</style>
