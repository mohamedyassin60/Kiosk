import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BasePage from '../components/BasePage'
import KioskForm from '../components/KioskForm'
import { post } from '../services/api'
import { useQueryClient } from '@tanstack/react-query'

const AddKiosk = () => {
  // const [kioskList, setTodoList] = useRecoilState(kioskListState)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const onAdd = async (data) => {
    console.log('onAdd', data)
    try {
      await post(`kiosks`, {
        body: data
      })
      await queryClient.invalidateQueries(['kiosks'])
      // setTodoList([...kioskList, { id: '13124', ...data }])
      navigate(-1)
    } catch (e) {
      console.error('onDelete', e)
    }
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
