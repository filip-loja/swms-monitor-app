<template>
  <q-page>
		<swms-option-panel />
		<swms-bin-table />
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsOptionPanel from 'components/SwmsOptionPanel.vue'
import SwmsBinTable from 'components/SwmsBinTable.vue'
export default Vue.extend({
  name: 'PageIndex',
  components: { SwmsOptionPanel, SwmsBinTable },
  data() {
    return { }
  }
})
</script>
