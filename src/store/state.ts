import { StateRoot } from 'src/store/store'

export default (): StateRoot => ({
  loggedIn: false,
  drawerState: false,
  filterDialogState: false,
  activeBinId: null,
  binStatusValues: ['disabled', 'enabled'],
  binTypeValues: ['mixed', 'glass', 'metal', 'paper', 'plastic'],
  binFilter: {
    pageSize: 100,
    type: [] as any,
    status: [] as any
  },
  binItems: [],
  nextToken: null,
  idSearchActive: false,
  loading: 0,
  selectedBins: new Set<string>(),
  selectedBinsCount: 0,
  azureMapCenter: [18.620, 48.771],
  azureMapMaxBounds: [[18.591718, 48.759056], [18.652761, 48.792376]],
  mapDialogActive: false,
  reports: [],
  telemetry: {}
})
