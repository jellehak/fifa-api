import { Server } from 'socket.io'
import { verifyToken } from '../middlewares/index.js'
import Room from './roomManager.js'
import { fixedOrigin } from './corsFixer.js'
import { hosts } from '../env.js'

export default app => {
  const io = new Server(app, {
    path: '/classic-mode',
    origins: fixedOrigin(hosts)
  })

  console.info('Socketio initialised!')

  const classicMode = io.of('/classic-mode')
  classicMode.use(verifySocker).on('connection', async socket => {
    const { username, roomId, password, action, options } = socket.handshake.query
    const room = new Room({ io: classicMode, socket, username, roomId, password, action, options })

    const joinedRoom = await room.init(username)
    console.info('Client Connected')

    if (joinedRoom) {
      room.showPlayers()
      room.isReady()
      room.shiftTurn()
    }

    room.onDisconnect()
  })

  return io
}

const verifySocker = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const decoded = verifyToken(socket.handshake.query.token)
    socket.decoded = decoded
    next()
  }
}
