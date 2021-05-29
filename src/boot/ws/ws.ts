import { boot } from 'quasar/wrappers'
import { WsConnection } from 'boot/ws/WsConnection'

export default boot(({ store }) => {
  new WsConnection(store)
})
