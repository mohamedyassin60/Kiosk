import React, { useState } from 'react'
import mocked from '../services/data'
import useModal from '../hooks/useModal'

const Home = () => {
  const [kiosks, setKiosks] = useState(mocked)
  const { showModel } = useModal()

  const handleAdd = () => {}

  const handleEdit = (id) => {}

  const handleDelete = (id) => {
    showModel(
      {
        title: 'Delete Kiosk',
        description:
          'Are you sure you want to delete this kiosk? This action cannot be undone.'
      },
      () => {
        alert('Deleted')
      }
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl h-screen">
      <div className="flex flex-col w-full h-full">
        <div className="flex mt-10 mb-4 items-center">
          <h1 className="flex-1 text-3xl font-bold">Kiosks</h1>
          <button
            className="px-6 py-4 font-bold text-white bg-newGreen rounded-full"
            onClick={handleAdd}
          >
            Add New
          </button>
        </div>
        <div className="pt-4 px-4 bg-white border-b-4 border-b-newGreen rounded-sm">
          <div className="w-full">
            {kiosks.map(
              ({
                id,
                serialKey,
                description,
                isKioskClosed,
                storeOpensAt,
                storeClosesAt
              }) => (
                <div key={id} className="flex border mb-3 p-3 rounded-md">
                  <div key={id} className="flex flex-col flex-1">
                    <div key={id} className="flex">
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
                  <div key={id} className="flex flex-col justify-center">
                    <div className="text-md text-gray-500">
                      Opens at {`${storeOpensAt}:00`}
                    </div>
                    <div className="text-md text-gray-500">
                      Closes at {`${storeClosesAt}:00`}
                    </div>
                    <div key={id} className="flex mt-2">
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
        </div>
      </div>
    </div>
  )
}

export default Home
