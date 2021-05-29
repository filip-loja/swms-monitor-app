import { BinFilter, Report, StateRoot } from 'src/store/store'

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

export const CLEAR_SELECTED_BINS = (state: StateRoot) => {
  state.selectedBins.clear()
  state.selectedBinsCount = 0
}

export const SET_MAP_DIALOG = (state: StateRoot, val: boolean) => {
  state.mapDialogActive = val
}

export const SET_REPORTS = (state: StateRoot, payload: Report[]) => {
  state.reports = payload
}

export const DELETE_REPORT = (state: StateRoot, reportId: string) => {
  const index = state.reports.findIndex(report => report.id === reportId)
  if (index >= 0) {
    state.reports.splice(index, 1)
  }
}
