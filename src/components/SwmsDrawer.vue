<template>
	<q-drawer
		:value="drawerState"
		@input="() => null"
		:show-if-above="drawerBehavior === 'mobile'"
		:overlay="drawerBehavior === 'mobile'"
		bordered
		content-class="bg-grey-1"
		side="right"
		:width="400"
		no-swipe-open
		no-swipe-close
		:behavior="drawerBehavior"
		no-swipe-backdrop
		persistent
	>
		<div class="q-px-md q-py-sm swms-drawer">

			<div class="row justify-between items-center">
				<div class="row items-center">
					<q-checkbox @input="selectBin($event, binId)" :value="isSelected" style="margin-left: -10px" />&nbsp;
					<div class="text-h5">Smart bin: {{ binId }}</div>
				</div>
				<div>
					<q-btn round flat icon="close" color="negative" @click="closeDrawer" />
				</div>
			</div>

			<div>
				<hr class="swms-hr" />
				<div class="q-pt-sm"></div>
			</div>

			<swms-bin-detail :key="binId" />

		</div>
	</q-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsBinDetail from 'components/SwmsBinDetail.vue'

export default Vue.extend({
	name: 'SwmsDrawer',
	components: { SwmsBinDetail },
	data () {
	  return {
		}
	},
	methods: {
    closeDrawer (): void {
      void this.$store.dispatch('closeDrawer')
    },
    selectBin (add: boolean, id: string) {
      if (add) {
        this.$store.commit('ADD_SELECTED_BIN',id)
      } else {
        this.$store.commit('REMOVE_SELECTED_BIN', id)
      }
    },
	},
	computed: {
	  binId (): string {
      return this.$store.state.activeBinId as string
		},
	  drawerState (): boolean {
	    return this.$store.state.drawerState as boolean
		},
    drawerBehavior (): string {
      return this.$route.name === 'viewMap' ? 'mobile' : 'desktop'
    },
    isSelected (): boolean {
      return this.$store.getters['selectedBins'].includes(this.binId)
    }
	}
})
</script>

<style scoped>

</style>
