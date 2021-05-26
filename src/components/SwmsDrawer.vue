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
				<div class="text-h5">{{ drawerTitle }}</div>
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
	},
	computed: {
	  binId (): string {
      return this.$store.state.activeBinId as string
		},
	  drawerState (): boolean {
	    return this.$store.state.drawerState as boolean
		},
		drawerTitle (): string {
	    return `Smart bin: ${this.binId}`
		},
    drawerBehavior (): string {
      return this.$route.name === 'viewMap' ? 'mobile' : 'desktop'
    }
	}
})
</script>

<style scoped>

</style>
