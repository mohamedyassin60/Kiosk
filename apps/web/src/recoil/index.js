import { atom } from 'recoil'

const kioskListState = atom({
  key: 'kioskListState',
  default: []
})

export { kioskListState }
