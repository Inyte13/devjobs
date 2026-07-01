import { Routes, Route } from 'react-router'
import { Header } from './components/header'
import { lazy } from 'react'

const Home = lazy(() => import('./pages/home'))
const Offers = lazy(() => import('./pages/offers'))
// const Job = lazy(() => import('./pages/Job.jsx'))

export function App() {
  return (
    <>
      <Header />
      <main className='h-[calc(100vh-53px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/offers' element={<Offers />} />
          {/* <Route path='/jobs/:id' element={<Job />} /> */}
        </Routes>
        <footer className='border-border border-t p-4 text-center'>
          <p>&copy; 2025 DevJobs. Todos los derechos reservados.</p>
        </footer>
      </main>
    </>
  )
}
