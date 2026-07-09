import { ApplicationCard } from '@/components/application-card'
import { applicationOptions } from '@/queries/application.queries'
import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Navigate, useLocation } from 'react-router'

export function Applications() {
  const location = useLocation()
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const role = useAuthStore(s => s.role)
  const {
    data: applications,
    isLoading,
    isError,
  } = useQuery(applicationOptions(role))
  if (!isAuthenticated) {
    return <Navigate to='/login' state={location.pathname} replace />
  }
  return (
    <section className='w-full flex flex-1 flex-col items-center gap-y-10 p-8'>
      {isError || applications === undefined ? (
        <p className='my-auto p-4'>Error al cargar las ofertas</p>
      ) : isLoading ? (
        <p className='my-auto p-4'>
          <Loader2 className='animate-spin' />
        </p>
      ) : (
        <>
          {applications.length === 0 ? (
            <p className='my-auto p-4 text-center'>No se encontraron empleos</p>
          ) : (
            <ul className='flex w-full flex-1 flex-col gap-y-3'>
              {applications.map(application => (
                <li className='w-full'key={application.id}>
                  <ApplicationCard application={application} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
