<template>
	<q-dialog
		v-model="state"
		maximized
		transition-show="slide-up"
		transition-hide="slide-down"
		@hide="onHidden"
	>
		<q-card>
			<q-bar class="bg-primary text-white">
				<q-space />
				<q-btn dense flat icon="close" v-close-popup />
			</q-bar>

			<div class="swms-map-dialog-inner">
				<slot />
			</div>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'SwmsMapDialog',
	data () {
	  return {
	    state: false
		}
	},
	methods: {
	  show () {
	    this.$store.commit('SET_MAP_DIALOG', true)
	    this.state = true
		},
		onHidden () {
      this.$store.commit('SET_MAP_DIALOG', false)
		}
	}
})
</script>

<style scoped lang="scss">

	.swms-map-dialog-inner {
		display: block;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		min-height: 300px;
		min-width: 500px;
		width: 100vw;
		height: calc(100vh - 32px);
		position: relative;
		overflow: hidden;
	}

</style>
