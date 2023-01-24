import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import Modal from '../components/Modal'

const ModalContext = createContext({})

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)

  const showModel = (options, onSuccess) => {
    setData({ ...options, onSuccess })
    setOpen(true)
  }
  const hideModel = () => setOpen(false)

  const contextValue = useMemo(
    () => ({
      options: data,
      open,
      showModel,
      hideModel
    }),
    [open, data]
  )

  useEffect(() => {
    if (!open && !!data) {
      setTimeout(() => setData(null), 300)
    }
  }, [open])

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal open={open} options={data} hideModel={hideModel} />
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
