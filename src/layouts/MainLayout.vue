<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated>
      <q-toolbar>
				<q-icon name="device_hub" size="md" />

        <q-toolbar-title>
          SWMS Monitor
        </q-toolbar-title>

				<q-btn flat no-caps v-if="isLoggedIn" @click="logOut"><q-icon name="logout" size="xs" />&nbsp;&nbsp;&nbsp;Log out</q-btn>
      </q-toolbar>
    </q-header>

		<swms-drawer />

    <q-page-container>
			<router-view />
    </q-page-container>

		<swms-loader />

  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import SwmsDrawer from 'components/SwmsDrawer.vue'
import SwmsLoader from 'components/SwmsLoader.vue'
export default Vue.extend({
  name: 'MainLayout',
	components: { SwmsDrawer, SwmsLoader },
  data() {
    return { }
  },
	methods: {
    logOut () {
      void this.$store.dispatch('logOut').then(() => this.$router.push({ name: 'logIn' }))
		}
	},
	computed: {
    isLoggedIn (): boolean {
      return this.$store.state.loggedIn
    }
	}
})
</script>
