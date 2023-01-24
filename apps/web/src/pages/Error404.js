import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
  const navigate = useNavigate()
  const handleBackHome = () => navigate('/')

  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-lg font-bold text-newGreen font-axiforma">404</p>
        <h1 className="text-5xl mt-2 font-bold font-axiforma">
          Page not found.
        </h1>
        <p className="text-lg mt-2 text-gray-500 font-axiforma">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <button
          className="mt-8 px-6 py-4 font-bold text-white bg-newGreen rounded-full"
          onClick={handleBackHome}
        >
          Go back home
        </button>
      </div>
    </div>
  )
}

export default Error404
