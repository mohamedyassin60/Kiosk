import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cron from 'node-cron'
import http from 'http'
import { WebSocketServer } from 'ws'
import {
  getKiosks,
  addKiosk,
  editKiosk,
  deleteKiosk,
  getKiosk,
  validateKiosk,
  checkSerialKey,
  updateKiosksStatus,
  validateKioskPayload
} from './kioskController.js'

const app = express()

app.use(bodyParser.json())

app.use(cors({ origin: true }))

const server = http.createServer()
const wsServer = new WebSocketServer({ server })
let client = null

// Define Endpoints
app.get('/', (req, res) =>
  res.status(200).send('Welcome to the Kiosk Management Api!')
)
app.get('/kiosks', getKiosks)
app.get('/kiosk/:id', getKiosk)
app.get('/kiosk/checkKey/:key', checkSerialKey)

app.post('/kiosks', [validateKioskPayload, addKiosk])

app.put('/kiosks/:id', [validateKiosk, editKiosk])

app.delete('/kiosks/:id', [validateKiosk, deleteKiosk])

// Start server
app.listen(3001, () => {
  console.log(`Now listening on port 3001`)
})

// Listen for web client
wsServer.on('connection', (ws) => {
  client = ws
})

// Start Websocket
server.listen(3002, () => {
  console.log(`WebSocket server is running on port 3002`)
})

// Schedule cron job every hour
cron.schedule('0 59 * * * *', async () => {
  console.log('running update kiosk task every hour')
  try {
    const changed = await updateKiosksStatus()
    if (changed && client) {
      client.send('update')
    }
  } catch (error) {
    console.error('cron', error)
  }
})
