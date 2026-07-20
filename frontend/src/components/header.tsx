import { Link, useLocation } from 'react-router'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/auth-store'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { AccountMenu } from './profile-menu'
import { ROUTES } from '@/lib/constants'

export function Header() {
  const location = useLocation()
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)

  return (
    <header className='border-input bg-card flex h-13 items-center justify-around border-b px-8 py-2'>
      <Link to={ROUTES.home} className='flex items-center gap-x-2'>
        <img src='/devjobs.png' alt='DevJobs logo' className='size-8' />
        <h1 className='text-2xl'>DevJobs</h1>
      </Link>
      <nav>
        <ul className='flex gap-x-2'>
          <li>
            <Link
              to={ROUTES.offers}
              className={cn(
                buttonVariants({ variant: 'link', size: 'lg' }),
                'text-base font-normal'
              )}
            >
              Empleos
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.applicationsMe}
              className={cn(
                buttonVariants({ variant: 'link', size: 'lg' }),
                'text-base font-normal'
              )}
            >
              Applicaciones
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.offersMe}
              className={cn(
                buttonVariants({ variant: 'link', size: 'lg' }),
                'text-base font-normal'
              )}
            >
              Ofertas
            </Link>
          </li>
        </ul>
      </nav>
      {!isAuthenticated ? (
        <div className='flex items-center gap-x-4'>
          <Link to={ROUTES.register} className='font-medium underline'>
            Regístrate
          </Link>
          <Link to={ROUTES.login} state={location.pathname}>
            <Button>Iniciar sesión</Button>
          </Link>
        </div>
      ) : (
        <AccountMenu isAuthenticated={isAuthenticated} />
      )}
    </header>
  )
}
