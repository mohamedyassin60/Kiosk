import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EditKiosk from './pages/EditKiosk'
import AddKiosk from './pages/AddKiosk'
import Error404 from './pages/Error404'
import { ModalProvider } from './hooks/useModal'
import { RecoilRoot } from 'recoil'
import BasePage from './components/BasePage'

function App() {
  const queryClient = new QueryClient()
  return (
    <RecoilRoot>
      <React.Suspense fallback={<BasePage header={<></>} />}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/edit/:id" element={<EditKiosk />} />
                <Route exact path="/add" element={<AddKiosk />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </Router>
          </ModalProvider>
        </QueryClientProvider>
      </React.Suspense>
    </RecoilRoot>
  )
}

export default App
