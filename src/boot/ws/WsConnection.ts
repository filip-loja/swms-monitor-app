import { Socket } from 'socket.io-client/build/socket'
import { io } from 'socket.io-client'
import { StateInterface } from 'src/store'
import { Store } from 'vuex'
import config from 'src/config'

export class WsConnection {
  socket: Socket = null
  store: Store<StateInterface> = null

  constructor (store: Store<StateInterface>) {
    this.store = store
    this.createSocket()
    this.socket.on('telemetry', (resp: any) => this.receiveTelemetry(resp))
  }

  createSocket () {
    this.socket = io(process.env.wsApiUrl, { autoConnect: false })
    this.socket.auth = { token: config.WS_KEY }
    this.socket.connect()
    console.log('Socket connection created')
  }

  receiveTelemetry (message: any) {
    console.log(message)
  }

}
