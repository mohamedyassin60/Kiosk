import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../hooks/useModal'
import BasePage from '../components/BasePage'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { dlt, get } from '../services/api'

const Home = () => {
  const navigate = useNavigate()
  const { showModel } = useModal()
  const queryClient = useQueryClient()

  const { data } = useQuery(['kiosks'], () => get('kiosks'))
  const kioskList = useMemo(
    () =>
      Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key]
      })),
    [data]
  )

  const onDelete = async (id) => {
    try {
      await dlt(`kiosks/${id}`)
      await queryClient.invalidateQueries(['kiosks'])
      // const kioskIdx = kioskList.findIndex((x) => x.id === id)
      // const _kioskList = [...kioskList]
      // _kioskList.splice(kioskIdx, 1)
      // setTodoList(_kioskList)
    } catch (e) {
      console.error('onDelete', e)
    }
  }

  const handleAdd = () => navigate('/add')

  const handleEdit = (id) => navigate(`/edit/${id}`)

  const handleDelete = (id) => {
    showModel(
      {
        title: 'Delete Kiosk',
        description:
          'Are you sure you want to delete this kiosk? This action cannot be undone.'
      },
      () => onDelete(id)
    )
  }

  const header = (
    <div className="flex mt-10 mb-4 items-center">
      <h1 className="flex-1 text-3xl font-bold">Kiosks</h1>
      <button
        className="px-6 py-4 font-bold text-white bg-newGreen rounded-full"
        onClick={handleAdd}
      >
        Add New
      </button>
    </div>
  )

  return (
    <BasePage header={header}>
      <div className="w-full">
        {kioskList.map(
          ({
            id,
            serialKey,
            description,
            isKioskClosed,
            storeOpensAt,
            storeClosesAt
          }) => (
            <div key={id} className="flex border mb-3 p-3 rounded-md">
              <div className="flex flex-col flex-1">
                <div className="flex">
                  <div
                    className={`py px-2 rounded-lg text-sm ${
                      isKioskClosed
                        ? 'text-red-700 bg-red-300'
                        : 'text-green-700 bg-green-300'
                    }`}
                  >
                    {isKioskClosed ? 'Closed' : 'Open'}
                  </div>
                </div>
                <div className="my-2 text-md text-gray-500">
                  {id} - {serialKey}
                </div>
                <div className="text-lg text-black-400">{description}</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-md text-gray-500">
                  Opens at {storeOpensAt}
                </div>
                <div className="text-md text-gray-500">
                  Closes at {storeClosesAt}
                </div>
                <div className="flex mt-2">
                  <button
                    className="px-3 py font-bold text-newGreen hover:underline"
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py font-bold text-red-500 hover:underline"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </BasePage>
  )
}

export default Home
