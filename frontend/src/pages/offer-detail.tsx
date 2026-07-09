import { Button } from '@/components/ui/button'
import {
  applicationOptions,
  useCreateApplication,
} from '@/queries/application.queries'
import { offerDetailOptions } from '@/queries/offer.queries'
import { useAuthStore } from '@/store/auth-store'
import { formatDate } from '@/utils/fecha'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Link, useParams } from 'react-router'

export function OfferDetail() {
  const { id } = useParams()
  const { data, isError } = useQuery(offerDetailOptions(id!))
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const role = useAuthStore(s => s.role)
  const { mutate, isPending } = useCreateApplication(id!)
  const { data: applications } = useQuery(applicationOptions(role))
  const alreadyApplied =
    applications?.some(application => application.offer.id === id) ?? false
  return (
    <div className='flex max-w-230 min-w-100 flex-1 flex-col items-start gap-y-6 p-8'>
      {isError ? (
        <p className='my-auto p-4'>Error al cargar la oferta</p>
      ) : !data ? (
        <p className='my-auto p-4'>
          <Loader2 className='animate-spin' />
        </p>
      ) : (
        <>
          <header className='border-border flex w-full justify-between border-b-2 pb-5'>
            <div className='flex flex-col gap-y-3'>
              <h2 className='text-4xl font-bold'>{data.title}</h2>
              <ul className='flex flex-wrap gap-x-2 capitalize'>
                <li className='self-center rounded-xl border border-green-200 bg-green-50 px-2.5 py-1 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400'>
                  S/{data.salary}
                </li>
                <li className='bg-secondary text-secondary-foreground self-center rounded-xl px-2.5 py-1 capitalize'>
                  {data.seniority}
                </li>
                {data.technologies.map(tech => (
                  <li
                    key={tech.id}
                    className='border-border text-foreground self-center rounded-xl border px-2.5 py-1'
                  >
                    {tech.name}
                  </li>
                ))}
              </ul>
              <span className='text-muted-foreground'>
                {formatDate(data.created)}
              </span>
            </div>
            <div className='flex flex-col justify-around'>
              <p className='text-muted-foreground flex flex-col justify-center text-lg font-medium'>
                <span className='text-secondary-foreground'>
                  {data.recruiter.company.name}
                </span>
                <span>
                  {data.location.name} ({data.modality})
                </span>
              </p>
              {!isAuthenticated ? (
                <Link to='/login' state={location.pathname}>
                  <Button>Aplicar</Button>
                </Link>
              ) : role !== 'candidate' ? (
                <Button disabled>Aplicar</Button>
              ) : alreadyApplied ? (
                <Button disabled>¡Aplicado!</Button>
              ) : (
                <Button onClick={() => mutate()} disabled={isPending}>
                  {isPending ? <Loader2 className='animate-spin' /> : 'Aplicar'}
                </Button>
              )}
            </div>
          </header>
          <p className='text-secondary-foreground border-border border-b-2 pb-6 text-lg'>
            {data.description_detail}
          </p>
          <article className='text-secondary-foreground flex flex-col'>
            <span>
              <strong>Reclutador: </strong>
              {data.recruiter.user.first_name}
            </span>
            <span>
              <strong>Email: </strong>
              {data.recruiter.contact_email}
            </span>
            <span>
              <strong>Ultima modificación: </strong>
              {formatDate(data.modified)}
            </span>
          </article>
        </>
      )}
    </div>
  )
}
