<template>
  <q-page>
		<swms-option-panel />
		<router-view :key="$route.fullPath" />

		<div :class="[narrowContainer ? 'swms-narrow' : '']">
			<q-banner v-if="showBanner" class="bg-deep-orange-2">
				<template v-slot:avatar>
					<q-icon name="sentiment_dissatisfied" color="negative" />
				</template>
				<div class="text-negative text-bold">
					No smart binds found. Try changing settings of the filter.
				</div>
			</q-banner>

			<div class="text-center full-width" v-if="hasMore">
				<br />
				<q-btn flat color="primary" @click="loadMore">Load more</q-btn>
			</div>
		</div>

  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsOptionPanel from 'components/SwmsOptionPanel.vue'
import { BinDetail } from 'src/store/store'
export default Vue.extend({
  name: 'PageIndex',
  components: { SwmsOptionPanel },
  data() {
    return { }
  },
	computed: {
    binItems (): BinDetail[] {
      return this.$store.state.binItems as BinDetail[]
    },
    hasMore (): boolean {
      return !!this.$store.state.nextToken
    },
    showBanner (): boolean {
      return this.binItems.length === 0 && this.$store.state.loading <= 0
    },
		narrowContainer (): boolean {
      return this.$route.name === 'viewTable'
		}
	},
	methods: {
    loadMore () {
      void this.$store.dispatch('loadBins')
    },
	},
  mounted () {
    this.loadMore()
  }
})
</script>

<style scoped lang="scss">

</style>
