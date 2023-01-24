import React, { useState } from 'react'

const useModal = () => {
  const [data, setData] = useState(null)

  const showModel = (options, onSuccess) => {
    setData({ ...options, onSuccess })
  }
  const hideModel = () => setData(null)

  return {
    options: data,
    open: !!data,
    showModel,
    hideModel
  }
}

export default useModal
