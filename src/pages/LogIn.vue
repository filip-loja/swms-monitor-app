<template>
	<q-page class="row justify-center items-center">
		<q-card bordered class="q-pa-md shadow-15 q-mb-lg" style="width: 400px">
			<q-card-section >
				<div class="text-h4 text-center">SWSM Manager</div>
			</q-card-section>
			<q-card-section>
				<q-form class="q-gutter-md">
					<q-input class="swsm-field" :error="error" tabindex="1" outlined dense clearable v-model.trim="model.username" type="text" label="Username" @keydown.enter="logIn" />
					<q-input class="swsm-field" :error="error" tabindex="2" outlined dense clearable v-model.trim="model.password" type="password" label="Password" @keydown.enter="logIn" />
				</q-form>
			</q-card-section>
			<q-card-actions class="q-px-md">
				<q-btn @click="logIn" unelevated color="primary" no-caps class="full-width" label="Log In" />
			</q-card-actions>
		</q-card>
	</q-page>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'LogIn',
	data () {
	  return {
	    model: {
	      username: '',
				password: ''
			},
			error: false,
		}
	},
	methods: {
	  logIn () {
	    if (!this.model.username || !this.model.password) {
	      this.error = true
	      this.$q.notify({
          progress: true,
          message: 'Fields must not be empty',
          color: 'negative',
          timeout: 2000
				})
				setTimeout(() => this.error = false, 2000)
			} else {
	    	void this.$store.dispatch('logIn', this.model).then(() => this.$router.push({ name: 'home' }))
			}
		}
	}
})
</script>

<style scoped lang="scss">

	.swsm-field {
		padding-bottom: 5px !important;
	}

</style>
