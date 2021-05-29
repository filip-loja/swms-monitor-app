<template>
  <q-layout view="hHh lpR fFf">

    <q-header>
      <q-toolbar class="shadow-1">
				<q-icon name="device_hub" size="md" />

        <q-toolbar-title>
          SWMS Monitor
        </q-toolbar-title>

				<template v-if="isLoggedIn">
					<div class="swms-tabs">
						<q-tabs align="left" >
							<q-route-tab no-caps :to="{name: 'viewTable'}" label="Home" />
							<q-route-tab no-caps :to="{name: 'pageReports'}" label="Reports" />
							<q-route-tab no-caps :to="{name: 'pageAlerts'}" label="Alerts" />
						</q-tabs>
					</div>
					<div class="swms-logout-wrapper">
						<q-btn flat no-caps @click="logOut"><q-icon name="logout" size="xs" />&nbsp;&nbsp;&nbsp;Log out</q-btn>
					</div>
				</template>
      </q-toolbar>
			<swms-option-panel v-if="showOptionPanel" />
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
import SwmsOptionPanel from 'components/SwmsOptionPanel.vue'
import { BinAlert } from 'src/store/store'
import * as _ from 'lodash'
export default Vue.extend({
  name: 'MainLayout',
	components: { SwmsDrawer, SwmsLoader, SwmsOptionPanel },
  data() {
    return { }
  },
	methods: {
    logOut () {
      void this.$store.dispatch('logOut').then(() => this.$router.push({ name: 'logIn' }))
		},
		showAlert (payload: BinAlert) {
      this.$q.notify({
        progress: true,
        message: payload.type === 'fire' ? 'Possible danger of fire!' : 'The bin appears to have been flipped over!' + `  (${payload.binId})`,
        color: 'negative',
        timeout: 4000,
				position: 'bottom',
        actions: [
          { label: 'Show', noCaps: true, color: 'white', handler: () => this.$store.dispatch('openDrawer', payload.binId) }
        ]
      })
		}
	},
	computed: {
    isLoggedIn (): boolean {
      return this.$store.state.loggedIn
    },
		showOptionPanel (): boolean {
      return ['viewTable', 'viewTile', 'viewMap'].includes(this.$route.name)
		},
		alerts (): BinAlert[] {
      return this.$store.getters['alerts']
		}
	},
	watch: {
    alerts: {
      handler (newValue: BinAlert[], oldValue: BinAlert[]) {
        const diff = _.differenceBy(newValue, oldValue, 'id')
				if (diff && diff.length) {
          for (const alertItem of diff) {
            this.showAlert(alertItem)
          }
				}
			},
			immediate: true
		}
	}
})
</script>

<style lang="scss">
	.swms-logout-wrapper {
		border-left: 1px solid rgba(255, 255, 255, 0.5);
		padding-left: 5px;
		margin-left: 10px;
	}
</style>
