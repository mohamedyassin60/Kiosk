import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasePage from '../components/BasePage'
import KioskForm from '../components/KioskForm'
import mocked from '../services/data'

const EditKiosk = () => {
  const [oldValues, setOldValues] = useState(null)
  const params = useParams()

  const onSubmit = (data) => {
    console.log('onSubmit', data)
  }

  useEffect(() => {
    if (!!params?.id) {
      setOldValues(mocked.find(({ id }) => id === params.id))
    }
  }, [params])

  const header = (
    <div className="flex mt-12 mb-8 items-center">
      <h1 className="flex-1 text-3xl font-bold">Edit Kiosk</h1>
    </div>
  )

  return (
    <BasePage header={header}>
      <KioskForm
        isFetching={!oldValues}
        oldValues={oldValues}
        onSubmit={onSubmit}
      />
    </BasePage>
  )
}

export default EditKiosk
