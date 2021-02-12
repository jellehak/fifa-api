import './database/db.js'
import express from 'express'
import http from 'http'
import routes from './routes.js'
import cors from 'cors'
import { socker } from './socker/index.js'
import { handleError, authenticated } from './middlewares/index.js'
import { API_PORT, hosts } from './env.js'

const app = express()
const server = new http.Server(app)
socker(server)

app.use(cors({ origin: hosts, credentials: true }))
app.use(express.json())
app.use('/users', authenticated)
app.use('/search', authenticated)

routes(app)

app.use((err, _req, res, _) => {
  handleError(err, res)
})

app.listen(API_PORT, () => {
  console.log(`Api listening on port http://localhost:${Number(API_PORT)}`)
})

server.listen(Number(API_PORT) + 1, () => {
  console.log(`Socker listening on port http://localhost:${Number(API_PORT) + 1}`)
  console.info(`Api and socker whitelisted for ${hosts}`)
})
