import mongoose from 'mongoose'
import { DB_URL } from './../env.js'

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

// When successfully connected
db.on('connected', () => {
  console.log('Mongoose connection open to ATLAS Server')
})

// If the connection throws an error
db.on('error', err => {
  console.warn(`Mongoose connection error: ${err}`)
})

// When the connection is disconnected
db.on('disconnected', () => {
  console.warn('Mongoose connection disconnected')
})

export default mongoose
