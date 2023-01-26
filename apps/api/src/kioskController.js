import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
const dbPath = path.join(__dirname, '..', 'api', 'src', 'db.json')

const readDBFile = async () =>
  new Promise((resolve, reject) =>
    fs.readFile(dbPath, (error, buffer) => {
      if (error) {
        return reject(error)
      }
      let data = JSON.parse(buffer) || {}
      resolve(data || {})
    })
  )

const saveDBFile = async (data) =>
  new Promise((resolve, reject) => {
    let json = JSON.stringify(data, null, 2)
    fs.writeFile(dbPath, json, (error) => {
      if (error) {
        return reject(error)
      }
      resolve()
    })
  })

const isKioskExists = async (id) => {
  try {
    const kiosks = await readDBFile()
    return !!kiosks[id]
  } catch (error) {
    return false
  }
}

const checkIfKioskClosed = (storeOpensAt, storeClosesAt) => {
  const date = new Date(Date.now())
  const currHrs = date.getHours()
  const currMins = date.getMinutes()
  const [openHrs, openMins] = storeOpensAt.split(':')
  const [closeHrs, closeMins] = storeClosesAt.split(':')
  const afterOpeningHrs =
    currHrs > parseInt(openHrs) ||
    (currHrs === parseInt(openHrs) && currMins >= parseInt(openMins))
  const beforeClosingHrs =
    currHrs < parseInt(closeHrs) ||
    (currHrs === parseInt(closeHrs) && currMins < parseInt(closeMins))
  return !(afterOpeningHrs && beforeClosingHrs)
}

const getKiosk = async (req, res) => {
  const {
    params: { id }
  } = req
  try {
    const kiosks = await readDBFile()
    if (!kiosks[id]) {
      return res.status(404).json('Kiosk not found')
    }
    return res.status(200).json(kiosks[id])
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const checkSerialKey = async (req, res) => {
  const {
    params: { key }
  } = req
  try {
    const kiosks = await readDBFile()
    const kiosksArr = Object.keys(kiosks).map((key) => ({
      id: key,
      ...kiosks[key]
    }))
    if (kiosksArr.find((x) => x.serialKey === key)) {
      return res.status(200).json(false)
    }
    return res.status(200).json(true)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const getKiosks = async (req, res) => {
  try {
    const kiosks = await readDBFile()
    return res.status(200).json(kiosks)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const updateKiosksStatus = async () => {
  const kiosks = await readDBFile()
  let changed = false
  Object.keys(kiosks).forEach((key) => {
    const { storeOpensAt, storeClosesAt, isKioskClosed } = kiosks[key]
    const isClosed = checkIfKioskClosed(storeOpensAt, storeClosesAt)
    if (isKioskClosed !== isClosed) {
      const oldData = kiosks[key]
      kiosks[key] = {
        ...oldData,
        isKioskClosed: isClosed
      }
      changed = true
    }
  })
  if (changed) {
    await saveDBFile(kiosks)
  }
  return changed
}

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

const addKiosk = async (req, res) => {
  const {
    body: { serialKey, description, storeOpensAt, storeClosesAt }
  } = req
  try {
    const newKiosk = {
      serialKey,
      description,
      storeOpensAt,
      storeClosesAt,
      isKioskClosed: checkIfKioskClosed(storeOpensAt, storeClosesAt)
    }
    const kiosks = await readDBFile()
    const newID = Math.random().toString(24).substring(2)
    kiosks[newID] = newKiosk
    await saveDBFile(kiosks)
    res.status(200).send({
      status: 'success',
      message: 'Kiosk added successfully',
      kiosk: newKiosk
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const editKiosk = async (req, res) => {
  try {
    const {
      body: { serialKey, description, storeOpensAt, storeClosesAt },
      params: { id }
    } = req

    const kiosks = await readDBFile()
    const oldData = kiosks[id] || {}
    kiosks[id] = {
      ...oldData,
      serialKey,
      description,
      storeOpensAt,
      storeClosesAt,
      isKioskClosed: checkIfKioskClosed(storeOpensAt, storeClosesAt)
    }
    await saveDBFile(kiosks)
    return res.status(200).json({
      status: 'success',
      message: 'Kiosk edited successfully',
      kiosk: kiosks[id]
    })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const deleteKiosk = async (req, res) => {
  const {
    params: { id }
  } = req

  try {
    const kiosks = await readDBFile()
    delete kiosks[id]
    await saveDBFile(kiosks)

    return res.status(200).json({
      status: 'success',
      message: 'Kiosk deleted successfully'
    })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export {
  validateKiosk,
  validateKioskPayload,
  isKioskExists,
  updateKiosksStatus,
  checkSerialKey,
  getKiosks,
  getKiosk,
  addKiosk,
  editKiosk,
  deleteKiosk
}
