<template>
	<swms-azure-map-main v-if="render && !mapDialogActive" :offset="100" :key="mapKey" :points="binItems" />
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsAzureMapMain from 'components/SwmsAzureMapMain.vue'
import { BinDetail } from 'src/store/store'
export default Vue.extend({
	name: 'PageMapView',
	components: {
    SwmsAzureMapMain
	},
	data () {
	  return {
	  	render: false
		}
	},
	computed: {
	  itemsSelected (): boolean {
      return this.$store.getters['selectedBins'].length > 0
		},
	  mapKey (): string {
	    return String(this.itemsSelected)
		},
    binItems (): BinDetail[] {
      return this.$store.state.binItems as BinDetail[]
    },
    mapDialogActive (): boolean {
	    return this.$store.state.mapDialogActive
		}
	},
	mounted () {
	  setTimeout(() => this.render = true, 1000)
  }
})
</script>

<style scoped>

</style>
