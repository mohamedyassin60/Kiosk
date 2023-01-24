import React, { useState } from 'react'

const useModal = () => {
  const [data, setData] = useState(null)

  console.log('data', data)

  const showModel = (options, onSuccess) => {
    console.log('showModel')
    setData({ ...options, onSuccess })
  }
  const hideModel = () => setData(null)

  return {
    data,
    open: !!data,
    showModel,
    hideModel
  }
}

export default useModal
