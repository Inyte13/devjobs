import type { OfferResponseSummary } from '../types/offer'

export function OfferCard({ offer }: { offer: OfferResponseSummary }) {
  return (
    <article
      data-id={offer.id}
      className='bg-card text-card-foreground border-border flex flex-col gap-3 rounded-xl border p-5'
    >
      <header className='flex flex-col gap-1'>
        <h3 className='text-lg font-semibold'>{offer.title}</h3>
        <p className='text-muted-foreground text-sm'>
          {offer.recruiter.company.name} |{' '}
          <span data-lugar={offer.location.name}>{offer.location.name}</span>
        </p>
      </header>

      <div className='flex flex-wrap gap-2 text-xs'>
        <span
          data-modalidad={offer.modality}
          className='bg-accent text-accent-foreground rounded-full px-3 py-1 capitalize'
        >
          {offer.modality}
        </span>
        <span
          data-nivel={offer.seniority}
          className='bg-secondary text-secondary-foreground rounded-full px-3 py-1 capitalize'
        >
          {offer.seniority}
        </span>
      </div>

      <div
        data-tecnologia={offer.technologies.map(t => t.name).join(',')}
        className='flex flex-wrap gap-2'
      >
        {offer.technologies.map(tech => (
          <span
            key={tech.id}
            className='border-border text-foreground rounded-md border px-2 py-1 text-xs'
          >
            {tech.name}
          </span>
        ))}
      </div>
    </article>
  )
}
