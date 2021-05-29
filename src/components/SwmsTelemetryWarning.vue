<template>
	<q-icon name="warning" color="negative" class="q-pl-xs q-pb-xs">
		<q-tooltip v-if="message">{{ message }}</q-tooltip>
	</q-icon>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'SwmsTelemetryWarning',
	props: {
	  message: { type: String, default: null }
	}
})
</script>

<style scoped>

</style>
