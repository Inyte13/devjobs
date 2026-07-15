import { Routes, Route } from 'react-router'
import { lazy } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { OfferDetail } from './pages/offer-detail'
import { Login } from './pages/login'
import { Layout } from './pages/layout'
import { AuthLayout } from './pages/auth-layout'
import { Register } from './pages/register'
import { queryClient } from './lib/query-client'
import { Applications } from './pages/applications'
import { Buttons } from './pages/buttons'

const Home = lazy(() => import('./pages/home'))
const Offers = lazy(() => import('./pages/offers'))

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/offers/:id' element={<OfferDetail />} />
          <Route path='/applications' element={<Applications />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
          <Route path='/buttons' element={<Buttons />} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
