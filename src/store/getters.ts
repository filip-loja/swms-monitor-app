import { BinAlert, BinTelemetry, GenericOptionItem, StateRoot, TypeBinStatus, TypeGarbage } from 'src/store/store'

export const binStatusItems = (state: StateRoot): GenericOptionItem[] => {
  return state.binStatusValues.map((item: TypeBinStatus) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }))
}

export const binTypeItems = (state: StateRoot): GenericOptionItem[] => {
  return state.binTypeValues.map((item: TypeGarbage) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }))
}

export const selectedBins = (state: StateRoot): string[] => {
  return state.selectedBinsCount >= 0 && [...state.selectedBins.values()]
}

export const alerts = (state: StateRoot): BinAlert[] => {
  const alerts: BinAlert[] = []
  Object.keys(state.telemetry).forEach((binId: string) => {
    if (state.telemetry[binId].length === 0) {
      return
    }
    const lastTelemetry: BinTelemetry = state.telemetry[binId][ state.telemetry[binId].length - 1 ]
    if (lastTelemetry.alertFire) {
      alerts.push({ binId, type: 'fire', time: new Date(lastTelemetry._ts * 1000).toString().split('GMT')[0].trim() })
    }
    if (lastTelemetry.alertFlip) {
      alerts.push({ binId, type: 'flip', time: new Date(lastTelemetry._ts * 1000).toString().split('GMT')[0].trim() })
    }
  })

  return alerts
}
