import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {
  getKiosks,
  addKiosk,
  editKiosk,
  deleteKiosk,
  getKiosk,
  isKioskExists
} from './kioskController.js'

const app = express()

app.use(bodyParser.json())

app.use(cors({ origin: true }))

const validateKioskPayload = async (req, res, next) => {
  const {
    body: { serialKey, description, storeOpensAt, storeClosesAt }
  } = req
  if (!serialKey || !description || !storeOpensAt || !storeClosesAt) {
    return res.status(400).send({
      message: 'Missing required fields'
    })
  }
  return next()
}

const validateKiosk = async (req, res, next) => {
  const {
    params: { id }
  } = req
  try {
    const exists = await isKioskExists(id)
    if (!exists) {
      return res.status(404).send({
        message: 'Kiosk not found'
      })
    }
    return next()
  } catch (error) {
    res.status(500).send({
      message: 'Error while validating id',
      error: error.message
    })
  }
}

app.get('/', (req, res) =>
  res.status(200).send('Welcome to the Kiosk Management Api!')
)
app.get('/kiosks', getKiosks)
app.get('/kiosk/:id', getKiosk)
app.post('/kiosks', [validateKioskPayload, addKiosk])
app.put('/kiosks/:id', [validateKiosk, editKiosk])
app.delete('/kiosks/:id', [validateKiosk, deleteKiosk])

app.listen(3001, () => {
  console.log(`Now listening on port 3001`)
})
