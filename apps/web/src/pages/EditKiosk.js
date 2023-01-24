import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasePage from '../components/BasePage'
import KioskForm from '../components/KioskForm'
import mocked from '../services/data'
import Error404 from './Error404'

const EditKiosk = () => {
  const [oldValues, setOldValues] = useState(null)
  const params = useParams()

  const onEdit = (data) => {
    console.log('onSubmit', data)
  }

  useEffect(() => {
    const kiosk = mocked.find(({ id }) => id === params?.id || '')
    setOldValues(kiosk)
  }, [params])

  const header = useMemo(
    () => (
      <div className="flex mt-12 mb-8 items-center">
        <h1 className="flex-1 text-3xl font-bold">Edit Kiosk</h1>
      </div>
    ),
    []
  )

  if (typeof oldValues === 'undefined') return <Error404 />

  return (
    <BasePage header={header}>
      <KioskForm
        isFetching={!oldValues}
        oldValues={oldValues}
        onSubmit={onEdit}
      />
    </BasePage>
  )
}

export default EditKiosk
