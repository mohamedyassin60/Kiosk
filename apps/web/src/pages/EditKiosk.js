import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BasePage from '../components/BasePage'
import KioskForm from '../components/KioskForm'
import Error404 from './Error404'
import { get, put } from '../services/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const EditKiosk = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const params = useParams()

  const { data, isFetching, isError } = useQuery(
    ['kiosk'],
    () => get(`kiosk/${params?.id}`),
    {
      enabled: !!params?.id
    }
  )
  const oldValues = useMemo(
    () => ({
      id: params.id,
      ...data
    }),
    [data]
  )

  const onEdit = async (data) => {
    console.log('onEdit', data)
    try {
      await put(`kiosks/${params.id}`, {
        body: data
      })
      await queryClient.invalidateQueries(['kiosks'])
      // const _kioskList = [...kioskList]
      // const kioskIdx = kioskList.findIndex((x) => x.id === params.id)
      // const oldData = kioskList[kioskIdx]
      // _kioskList[kioskIdx] = { ...oldData, ...data }
      // setTodoList(_kioskList)
      navigate(-1)
    } catch (e) {
      console.error('onEdit', e)
    }
  }

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
        isFetching={isFetching || isError}
        oldValues={oldValues}
        onSubmit={onEdit}
      />
    </BasePage>
  )
}

export default EditKiosk
