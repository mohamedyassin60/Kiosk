import React, { useMemo } from 'react'
import BasePage from '../components/BasePage'
import KioskForm from '../components/KioskForm'

const AddKiosk = () => {
  const onAdd = (data) => {
    console.log('onSubmit', data)
  }

  const header = useMemo(
    () => (
      <div className="flex mt-12 mb-8 items-center">
        <h1 className="flex-1 text-3xl font-bold">Add New Kiosk</h1>
      </div>
    ),
    []
  )

  return (
    <BasePage header={header}>
      <KioskForm onSubmit={onAdd} />
    </BasePage>
  )
}

export default AddKiosk
