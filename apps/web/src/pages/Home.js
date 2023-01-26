import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BasePage from '../components/BasePage'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { get } from '../services/api'
import useWebSocket from 'react-use-websocket'
import Kiosk from '../components/Kiosk'

const Home = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data } = useQuery(['kiosks'], () => get('kiosks'))

  useWebSocket('ws://localhost:3002', {
    onOpen: () => {
      console.log('WebSocket connection established.')
    },
    onMessage: async ({ data }) => {
      console.log('WebSocket sent', data)
      switch (data) {
        case 'update':
          await queryClient.invalidateQueries(['kiosks'])
          break
        default:
          break
      }
    }
  })

  const kioskList = useMemo(
    () =>
      Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key]
      })),
    [data]
  )

  const header = useMemo(
    () => (
      <div className="flex mt-10 mb-4 items-center">
        <h1 className="flex-1 text-3xl font-bold">Kiosks</h1>
        <button
          className="px-6 py-4 font-bold text-white bg-newGreen rounded-full"
          onClick={() => navigate('/add')}
        >
          Add New
        </button>
      </div>
    ),
    []
  )

  return (
    <BasePage header={header}>
      <div className="w-full">
        {kioskList.map((item) => (
          <Kiosk key={item.id} item={item} />
        ))}
      </div>
    </BasePage>
  )
}

export default Home
