import { Link, useLocation } from 'react-router'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/auth-store'

export function Header() {
  const location = useLocation()
  const logout = useAuthStore(s => s.logout)
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return (
    <header className='border-border flex items-center justify-around border-b px-8 py-2'>
      <Link to='/' className='flex items-center gap-x-2'>
        <img src='/devjobs.png' alt='DevJobs logo' className='size-8' />
        <h1 className='text-2xl'>DevJobs</h1>
      </Link>
      <nav>
        <ul className='flex gap-x-7'>
          <li>
            <Link to='/offers'>Empleos</Link>
          </li>
          <li>
            <Link to='/applications'>Applicaciones</Link>
          </li>
          <li>
            <Link to='/companies'>Empresas</Link>
          </li>
        </ul>
      </nav>
      {!isAuthenticated ? (
        <div className='flex items-center gap-x-4'>
          <Link to='/register' className='font-medium underline'>
            Regístrate
          </Link>
          <Link to='/login' state={location.pathname}>
            <Button>Iniciar sesión</Button>
          </Link>
        </div>
      ) : (
        <Button onClick={logout}>Cerrar sesión</Button>
      )}
    </header>
  )
}
