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
})
