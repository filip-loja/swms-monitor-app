<template>
	<div class="swms-option-panel text-black">
		<div class="swms-btn-wrapper swms-tabs no-indicator">
			<q-tabs align="left" shrink dense active-color="primary">
				<q-route-tab no-caps :to="{name: 'viewTable'}" label="Table view" />
				<q-route-tab no-caps :to="{name: 'viewTile'}" label="Tile view" />
				<q-route-tab no-caps :to="{name: 'viewMap'}" label="Map view" />
			</q-tabs>
		</div>

		<q-btn @click="openFilterDialog" no-caps flat color="primary" :disable="idSearchActive">
			Filter&nbsp;
			<q-icon name="filter_alt" size="xs" />
		</q-btn>

		<q-input outlined dense v-model="searchBinModel" bg-color="white" class="q-ml-sm swms-search-field" placeholder="Search bin by ID" @keydown.enter="searchBin">
			<template v-slot:append>
				<q-btn round flat icon="search" @click="searchBin" />
			</template>
		</q-input>
		&nbsp;
		<q-btn flat outlined round v-if="idSearchActive" icon="cancel" color="negative" @click="closeIdSearchMode" />

		<swms-filter-dialog />

	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsFilterDialog from 'components/SwmsFilterDialog.vue'
export default Vue.extend({
	name: 'SwmsOptionPanel',
	components: { SwmsFilterDialog },
	data () {
	  return {
	    searchBinModel: '',
			pageModel: null,
			viewModeOptions: [
				{ label: 'Table view', value: 'viewTable' },
				{ label: 'Tile view', value: 'viewTile' },
				{ label: 'Map view', value: 'viewMap' }
			]
		}
	},
  methods: {
    openDrawer (bindId: string) {
      void this.$store.dispatch('openDrawer', bindId)
    },
    openFilterDialog () {
      this.$store.commit('SET_FILTER_DIALOG', true)
		},
		searchBin () {
      let id = this.searchBinModel.trim()
			if (!id) {
			  return
			}
      if (!id.startsWith('bin-')) {
        id = 'bin-' + Number(id).toString().padStart(3, '0')
			}
			void this.$store.dispatch('findBinById', id)
		},
		closeIdSearchMode () {
      this.searchBinModel = ''
			void this.$store.dispatch('closeIdSearchMode')
		}
  },
	computed: {
    idSearchActive (): boolean {
      return this.$store.state.idSearchActive as boolean
		},
		tabModel: {
      get (): string {
        return this.$route.name
			},
			set (value: string): void {
        void this.$router.push({ name: value })
			}
		}
	}
})
</script>

<style scoped lang="scss">

	$border-color: #cbcaca;
	.swms-option-panel {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		height: 50px;
		background: #ecebeb;
		width: 100%;
		border-bottom: 1px solid $border-color;
		padding: 0 5px;
	}

	.swms-btn-wrapper {
		padding-right: 5px;
		margin-right: 10px;
		border-right: 1px solid $border-color;
	}

	.swms-search-field ::v-deep .q-field__control {
		padding-right: 0 !important;
	}

</style>
