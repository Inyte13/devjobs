import { ApplicationResponseCandidate } from '@/types/application'
import { formatDate } from '@/utils/fecha'
import { Link } from 'react-router'

export function ApplicationCard({
  application,
}: {
  application: ApplicationResponseCandidate
}) {
  return (
    <Link to={`/offers/${application.offer.id}`}>
      <article className='bg-card text-card-foreground border-border mx-auto flex max-w-150 min-w-100 justify-between gap-3 rounded-xl border p-4'>
        <div className='flex-warp flex flex-col justify-between'>
          <header>
            <h3 className='text-lg font-semibold'>{application.offer.title}</h3>
            <p className='text-muted-foreground flex flex-col text-sm capitalize'>
              <span className='text-secondary-foreground'>
                {application.offer.recruiter.company.name}
              </span>
              <span>
                {application.offer.location.name} ({application.offer.modality})
              </span>
            </p>
          </header>
          <p className='text-secondary-foreground flex flex-col gap-x-2 text-sm'>
            <span>
              Reclutador: {application.offer.recruiter.user.first_name}
            </span>
            <span>Aplicaste el {formatDate(application.created)}</span>
          </p>
        </div>
        <div className='flex flex-col justify-between'>
          <ul className='flex justify-end gap-x-1.5 text-xs'>
            <li className='self-center rounded-xl border border-green-200 bg-green-50 px-2.5 py-1 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400'>
              S/{application.offer.salary}
            </li>
            <li className='bg-secondary text-secondary-foreground self-center rounded-xl px-2.5 py-1 capitalize'>
              {application.offer.seniority}
            </li>
          </ul>
          <div
            className={
              'flex items-center justify-center self-end rounded-xl border px-2.5 py-1 ' +
              {
                pending:
                  'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
                reviewed:
                  'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400',
                rejected:
                  'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400',
                hired:
                  'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400',
              }[application.status]
            }
          >
            {
              {
                pending: 'Pendiente',
                reviewed: 'Revisado',
                rejected: 'Rechazado',
                hired: 'Contratado',
              }[application.status]
            }
          </div>
          <span className='text-secondary-foreground flex flex-col gap-x-2 text-sm'>
            Actualizado el {formatDate(application.modified)}
          </span>
        </div>
      </article>
    </Link>
  )
}
