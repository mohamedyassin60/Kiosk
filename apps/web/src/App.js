import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EditKiosk from './pages/EditKiosk'
import AddKiosk from './pages/AddKiosk'
import Error404 from './pages/Error404'
import Modal from './components/Modal'
import useModal from './hooks/useModal'

function App() {
  const queryClient = new QueryClient()
  const { open, data } = useModal()

  console.log('modal', open, data)

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/edit/:code" element={<EditKiosk />} />
          <Route exact path="/add" element={<AddKiosk />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Modal open={open} />
    </QueryClientProvider>
  )
}

export default App
