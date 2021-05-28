<template>
  <q-page>
		<div class="row">
			<div :class="[binsSelected ? 'col-9' : 'col-12']">

				<transition
					appear
					enter-active-class="animated fadeIn"
					leave-active-class="animated fadeOut"
				>
					<router-view :key="$route.fullPath" />
				</transition>

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

			</div>

			<div class="col-3" v-if="binsSelected">
				<swms-selected-panel />
			</div>

		</div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { BinDetail } from 'src/store/store'
import SwmsSelectedPanel from 'components/SwmsSelectedPanel.vue'
export default Vue.extend({
  name: 'PageIndex',
  components: { SwmsSelectedPanel },
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
		},
    binsSelected (): boolean {
      return this.$store.getters['selectedBins'].length > 0
    },
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
