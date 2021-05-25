import { GenericOptionItem, StateRoot, TypeBinStatus, TypeGarbage } from 'src/store/store'

export const binStatusItems = (state: StateRoot): GenericOptionItem[] => {
  return state.binStatusValues.map((item: TypeBinStatus) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }))
}

export const binTypeItems = (state: StateRoot): GenericOptionItem[] => {
  return state.binTypeValues.map((item: TypeGarbage) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }))
}

export const selectedBins = (state: StateRoot): string[] => {
  return state.selectedBinsCount >= 0 && [...state.selectedBins.values()]
}
