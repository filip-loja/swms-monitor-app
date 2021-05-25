<template>
	<q-badge v-if="value" :style="{background: color}">{{ value }}</q-badge>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'SwmsBadge',
	props: {
	  value: { type: String, default: null }
	},
	computed: {
	  color (): string {
	    const colorMap: any = {
	      plastic: '#FECA18',
				paper: '#13A8E1',
				glass: '#75B73B',
				metal: '#E61C29',
				mixed: '#4E4C4A',
				enabled: '#21c12e',
				disabled: '#B0BEC5'
			}
			// eslint-disable-next-line
	    return colorMap[this.value] || '#8C9EFF'
		}
	}
})
</script>

<style scoped>

</style>
