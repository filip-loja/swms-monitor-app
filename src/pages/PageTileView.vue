<template>
	<div class="swms-tile-container">
		<swms-bin-tile v-for="bin in binItems" :key="bin.binId" :model="bin" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinDetail } from 'src/store/store'
import SwmsBinTile from 'components/SwmsBinTile.vue'
export default Vue.extend({
	name: 'PageTileView',
	components: { SwmsBinTile },
  computed: {
    binItems (): BinDetail[] {
      return this.$store.state.binItems as BinDetail[]
    }
  }
})
</script>

<style scoped lang="scss">

	.swms-tile-container {
		display: grid;
		/*grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));*/
		grid-template-columns: repeat(auto-fill, 150px);
		grid-gap: 15px;
		padding: 10px;
	}

</style>
