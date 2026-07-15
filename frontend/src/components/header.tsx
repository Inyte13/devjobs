import { Link, useLocation } from 'react-router'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/auth-store'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { candidateOptions } from '@/queries/candidate.queries'
import { recruiterOptions } from '@/queries/recruiter.queries'
import { userOptions } from '@/queries/user.queries'
import { Skeleton } from './ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LogOutIcon, User, UserIcon } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const location = useLocation()
  const logout = useAuthStore(s => s.logout)
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery(userOptions(isAuthenticated))
  const { data: candidate } = useQuery(candidateOptions(isAuthenticated))
  const { data: recruiter } = useQuery(recruiterOptions(isAuthenticated))
  return (
    <header className='border-input bg-card flex h-13 items-center justify-around border-b px-8 py-2'>
      <Link to='/' className='flex items-center gap-x-2'>
        <img src='/devjobs.png' alt='DevJobs logo' className='size-8' />
        <h1 className='text-2xl'>DevJobs</h1>
      </Link>
      <nav>
        <ul className='flex gap-x-4'>
          <li>
            <Link
              to='/offers'
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
              to='/applications'
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
              to='/companies'
              className={cn(
                buttonVariants({ variant: 'link', size: 'lg' }),
                'text-base font-normal'
              )}
            >
              Empresas
            </Link>
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
        <>
          {userLoading || userError || !user ? (
            <Skeleton className='size-9' />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Avatar className='size-9'>
                    <AvatarFallback>
                      {user.first_name[0]}
                      {user.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                }
              />
              <DropdownMenuContent align='end' sideOffset={6}>
                <DropdownMenuItem>
                  <UserIcon />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User />
                  Cambiar candidato
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} variant='destructive'>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </header>
  )
}
