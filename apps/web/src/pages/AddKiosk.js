import React from 'react'
import BasePage from '../components/BasePage'
import KioskForm from '../components/KioskForm'

const AddKiosk = () => {
  const onSubmit = (data) => {
    console.log('onSubmit', data)
  }

  const header = (
    <div className="flex mt-12 mb-8 items-center">
      <h1 className="flex-1 text-3xl font-bold">Add New Kiosk</h1>
    </div>
  )

  return (
    <BasePage header={header}>
      <KioskForm onSubmit={onSubmit} />
    </BasePage>
  )
}

export default AddKiosk
