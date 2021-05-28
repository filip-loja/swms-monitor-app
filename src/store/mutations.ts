import { BinDetail, BinFilter, StateRoot } from 'src/store/store'
import Vue from 'vue'

export const SET_LOGIN_STATE = (state: StateRoot, newState: boolean) => {
  state.loggedIn = newState
}

export const SET_DRAWER = (state: StateRoot, newState: boolean) => {
  state.drawerState = newState
}

export const SET_LOADING = (state: StateRoot, value: number) => {
  state.loading += value
}

export const SET_ACTIVE_BIN = (state: StateRoot, bindId: string) => {
  state.activeBinId = bindId
}

export const SET_FILTER_DIALOG = (state: StateRoot, newState: boolean) => {
  state.filterDialogState = newState
}

export const SET_FILTER_OBJ = (state: StateRoot, obj: BinFilter) => {
  state.binFilter = JSON.parse(JSON.stringify(obj))
}

export const APPEND_ITEMS = (state: StateRoot, items: any[]) => {
  state.binItems.push(...items)
}

export const CLEAR_ITEMS = (state: StateRoot) => {
  state.binItems = []
}

export const SET_NEXT_TOKEN = (state: StateRoot, token: string) => {
  // @ts-ignore
  state.nextToken = token
}

export const DELETE_BIN = (state: StateRoot, binId: string) => {
  const index = state.binItems.findIndex((item: BinDetail) => item.binId === binId)
  if (index >= 0) {
    state.binItems.splice(index, 1)
  }
}

export const UPDATE_BIN = (state: StateRoot, payload: BinDetail) => {
  const index = state.binItems.findIndex((item: BinDetail) => item.binId === payload.binId)
  if (index >= 0) {
    Vue.set(state.binItems, index, Object.assign({}, state.binItems[index], payload))
  }
}

export const SET_FIND_ID_FLAG = (state: StateRoot, flagValue: boolean) => {
  state.idSearchActive = flagValue
}

export const ADD_SELECTED_BIN = (state: StateRoot, id: string) => {
  state.selectedBins.add(id)
  state.selectedBinsCount++
}

export const REMOVE_SELECTED_BIN = (state: StateRoot, id: string) => {
  state.selectedBins.delete(id)
  state.selectedBinsCount--
}

export const SET_MAP_DIALOG = (state: StateRoot, val: boolean) => {
  state.mapDialogActive = val
}
