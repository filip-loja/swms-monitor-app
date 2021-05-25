<template>
	<transition
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
	>
		<div class="swms-loader" v-if="isVisible">
			<q-circular-progress
				indeterminate
				size="75px"
				:thickness="0.6"
				color="primary"
				center-color="lime"
				class="q-ma-md"
			/>
		</div>
	</transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'SwmsLoader',
	computed: {
	  isVisible (): boolean {
	    return this.$store.state.loading > 0
		}
	}
})
</script>

<style scoped lang="scss">

	.swms-loader {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
		background: rgba(255,255,255,0.6);
	}

</style>
