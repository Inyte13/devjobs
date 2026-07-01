import { NavLink } from 'react-router'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className='border-border flex items-center justify-around border-b px-8 py-2'>
      <NavLink to='/' className='flex items-center gap-x-2'>
        <img src='public/devjobs.png' alt='DevJobs logo' className='size-8' />
        <h1 className='text-2xl'>DevJobs</h1>
      </NavLink>
      <nav>
        <ul className='flex gap-x-7'>
          <li>
            <NavLink to='/offers'>Empleos</NavLink>
          </li>
          <li>
            <NavLink to='/applications'>Applicaciones</NavLink>
          </li>
          <li>
            <NavLink to='/companies'>Empresas</NavLink>
          </li>
        </ul>
      </nav>
      <Button>Iniciar sesión</Button>
    </header>
  )
}
