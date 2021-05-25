import { ActionContext } from 'vuex'
import { BinDetail, BinFilter, StateRoot } from 'src/store/store'
import { Notify } from 'quasar'
import Vue from 'vue'
import config from 'src/config'
import { Cookies } from 'quasar'

type A = ActionContext<StateRoot, StateRoot>

export const openDrawer = (context: A, binId: string) => {
  context.commit('SET_ACTIVE_BIN', binId)
  context.commit('SET_DRAWER', true)
}

export const closeDrawer = (context: A) => {
  context.commit('SET_ACTIVE_BIN', null)
  context.commit('SET_DRAWER', false)
}

export const loadConnectionString = (context: A, binId: string) => {
  context.commit('SET_LOADING', 1)
  return Vue.prototype.$apiManager.get(`bin/${binId}/connection`)
    .then((resp: any) => {
      const payload = { binId, connectionString: resp.data.data }
      context.commit('UPDATE_BIN', payload)
      return resp.data.data
    })
    .catch((err: any) => console.log(err.response.data.error))
    .finally(() => context.commit('SET_LOADING', -1))
}

export const loadBins = (context: A, filterObj?: BinFilter) => {
  context.commit('SET_LOADING', 1)
  if (filterObj) {
    context.commit('SET_FILTER_OBJ', filterObj)
    context.commit('CLEAR_ITEMS')
  }
  const payload = {
    ...context.state.binFilter,
    token: context.state.nextToken
  }
  Vue.prototype.$apiManager.post('bin/list', payload)
    .then((resp: any) => {
      context.commit('APPEND_ITEMS', resp.data.data.items)
      context.commit('SET_NEXT_TOKEN', resp.data.data.nextToken)
    })
    .catch((err: any) => {
      console.log(err.response.data.error)
      Notify.create({
        progress: true,
        message: JSON.stringify(err.response.data.error).replace(/["\\{}]/g, ' ').trim(),
        color: 'negative',
        timeout: 7000
      })
    })
    .finally(() => context.commit('SET_LOADING', -1))
}

export const deleteBin = (context: A, binId: string) => {
  context.commit('SET_LOADING', 1)
  Vue.prototype.$apiManager.delete(`/bin/delete/${binId}`)
    .then(() => {
      context.commit('DELETE_BIN', binId)
      Notify.create({
        progress: true,
        message: 'Smart bin was deleted successfully.',
        color: 'positive',
        timeout: 3000
      })
      if (context.state.idSearchActive) {
        return context.dispatch('closeIdSearchMode')
      }
    })
    .catch((err: any) => {
      console.log(err.response.data.error)
      Notify.create({
        progress: true,
        message: JSON.stringify(err.response.data.error).replace(/["\\{}]/g, ' ').trim(),
        color: 'negative',
        timeout: 7000
      })
    })
    .finally(() => context.commit('SET_LOADING', -1))
}

export const findBinById = (context: A, binId: string) => {
  context.commit('SET_LOADING', 1)
  Vue.prototype.$apiManager.get(`bin/${binId}`)
    .then((resp: any) => {
      context.commit('CLEAR_ITEMS')
      context.commit('APPEND_ITEMS', [resp.data.data])
      context.commit('SET_NEXT_TOKEN', undefined)
      context.commit('SET_FIND_ID_FLAG', true)
    })
    .catch((err: any) => {
      console.log(err.response.data.error)
      Notify.create({
        progress: true,
        message: 'Smart bin was not found!',
        color: 'negative',
        timeout: 3000
      })
    })
    .finally(() => context.commit('SET_LOADING', -1))
}

export const closeIdSearchMode = (context: A) => {
  context.commit('SET_FIND_ID_FLAG', false)
  context.commit('CLEAR_ITEMS')
  void context.dispatch('loadBins')
}

export const updateBinStatus = (context: A, payload: any) => {
  context.commit('SET_LOADING', 1)
  Vue.prototype.$apiManager.put(`/bin/status/${payload.binId}`, { status: payload.status })
    .then(() => {
      context.commit('UPDATE_BIN', payload)
      Notify.create({
        progress: true,
        message: payload.status === 'enabled' ? 'Smart bin activated' : 'Smart bin deactivated',
        color: 'positive',
        timeout: 3000
      })
    })
    .catch((err: any) => {
      console.log(err.response.data.error)
      Notify.create({
        progress: true,
        message: JSON.stringify(err.response.data.error).replace(/["\\{}]/g, ' ').trim(),
        color: 'negative',
        timeout: 7000
      })
    })
    .finally(() => context.commit('SET_LOADING', -1))
}

export const updateBinDetails = (context: A, payload: BinDetail) => {
  context.commit('SET_LOADING', 1)
  const httpPayload = { ...payload }
  delete httpPayload.binId
  Vue.prototype.$apiManager.put(`/bin/detail/${payload.binId}`, httpPayload)
    .then(() => {
      context.commit('UPDATE_BIN', payload)
      Notify.create({
        progress: true,
        message: 'Smart bin updated successfully',
        color: 'positive',
        timeout: 2000
      })
      return context.dispatch('closeDrawer')
    })
    .catch((err: any) => {
      console.log(err.response.data.error)
      Notify.create({
        progress: true,
        message: JSON.stringify(err.response.data.error).replace(/["\\{}]/g, ' ').trim(),
        color: 'negative',
        timeout: 7000
      })
    })
    .finally(() => context.commit('SET_LOADING', -1))
}

export const createBin = (context: A, payload: BinDetail) => {
  context.commit('SET_LOADING', 1)
  Vue.prototype.$apiManager.post('bin/create', payload)
    .then((resp: any) => {
      payload.binId = resp.data.data
      payload.status = 'disabled'
      context.commit('CLEAR_ITEMS')
      context.commit('APPEND_ITEMS', [payload])
      context.commit('SET_NEXT_TOKEN', undefined)
      context.commit('SET_FIND_ID_FLAG', true)
      Notify.create({
        progress: true,
        message: 'Smart bin created successfully',
        color: 'positive',
        timeout: 2000
      })
      return context.dispatch('closeDrawer')
    })
    .catch((err: any) => {
      console.log(err.response.data.error)
      Notify.create({
        progress: true,
        message: JSON.stringify(err.response.data.error).replace(/["\\{}]/g, ' ').trim(),
        color: 'negative',
        timeout: 7000
      })
    })
    .finally(() => context.commit('SET_LOADING', -1))
}

export const logIn = (context: A, payload: any) => {
  context.commit('SET_LOADING', 1)
  if (payload.username !== 'filip.loja' || payload.password !== 'swsmlnu') {
    return setTimeout(() => {
      context.commit('SET_LOADING', -1)
      Notify.create({
        progress: true,
        message: 'Invalid credentials',
        color: 'negative',
        timeout: 2000
      })
    }, 2000)
  }

  return new Promise(resolve => {
    return setTimeout(() => {
      const key = config.API_MANAGER_KEY
      Vue.prototype.$apiManager.defaults.headers.common['Authorization'] = key
      Cookies.set('swsm-monitor-key', key)
      context.commit('SET_LOGIN_STATE', true)
      context.commit('SET_LOADING', -1)
      resolve(true)
    }, 1500)
  })

}

export const logOut = (context: A) => {
  delete Vue.prototype.$apiManager.defaults.headers.common['Authorization']
  Cookies.remove('swsm-monitor-key')
  context.commit('SET_LOGIN_STATE', false)
  context.commit('CLEAR_ITEMS')
  context.commit('SET_NEXT_TOKEN', undefined)
}

export const loadManagerKey = (context: A) => {
  const key = Cookies.get('swsm-monitor-key')
  if (key) {
    Vue.prototype.$apiManager.defaults.headers.common['Authorization'] = key
    context.commit('SET_LOGIN_STATE', true)
  }
}
