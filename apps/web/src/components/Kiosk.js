import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../hooks/useModal'
import { dlt } from '../services/api'
import { useQueryClient } from '@tanstack/react-query'

const Kiosk = ({ item }) => {
  const {
    id,
    serialKey,
    description,
    isKioskClosed,
    storeOpensAt,
    storeClosesAt
  } = item

  const { showModel } = useModal()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onDelete = async (id) => {
    try {
      await dlt(`kiosks/${id}`)
      await queryClient.invalidateQueries(['kiosks'])
    } catch (e) {
      console.error('onDelete', e)
    }
  }

  const handleEdit = useCallback(() => navigate(`/edit/${id}`), [id])

  const handleDelete = useCallback(() => {
    const title = 'Delete Kiosk'
    const description =
      'Are you sure you want to delete this kiosk? This action cannot be undone.'
    showModel({ title, description }, () => onDelete(id))
  }, [id])

  return (
    <div className="flex border mb-3 p-3 rounded-md">
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
        <div className="text-md text-gray-500">Opens at {storeOpensAt}</div>
        <div className="text-md text-gray-500">Closes at {storeClosesAt}</div>
        <div className="flex mt-2">
          <button
            className="px-3 py font-bold text-newGreen hover:underline"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="px-3 py font-bold text-red-500 hover:underline"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// Only re-render item if object changes
const kioskPropsAreEqual = (prev, next) => {
  const { item: prevItem } = prev
  const { item: nextItem } = next
  return (
    prevItem.id === nextItem.id &&
    prevItem.serialKey === nextItem.serialKey &&
    prevItem.description === nextItem.description &&
    prevItem.isKioskClosed === nextItem.isKioskClosed &&
    prevItem.storeOpensAt === nextItem.storeOpensAt &&
    prevItem.storeClosesAt === nextItem.storeClosesAt
  )
}

export default memo(Kiosk, kioskPropsAreEqual)
