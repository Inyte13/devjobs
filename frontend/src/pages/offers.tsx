import { EnumCombobox } from '@/components/enum-combobox'
import { OfferCard } from '@/components/offer-card'
import { Pagination } from '@/components/pagination'
import { QueryCombobox } from '@/components/query-combobox'

import { Input } from '@/components/ui/input'

import { useFilters } from '@/hooks/useFilters'
import { LIMIT, MODALITY_OPTIONS, SENIORITY_OPTIONS } from '@/lib/constants'
import { locationOptions } from '@/queries/location.queries'
import { offerSummaryOptions } from '@/queries/offer.queries'
import { technologyOptions } from '@/queries/technology.queries'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export default function Offers() {
  const {
    searchParams,
    inputText,
    setInputText,
    filters,
    setFilter,
    setModality,
    setSeniority,
    pagina,
    toPagina,
    offset,
  } = useFilters()
  const locationResponse = useQuery(locationOptions())
  const technologyResponse = useQuery(technologyOptions())
  const { data, isError } = useQuery(
    offerSummaryOptions({ ...filters, limit: LIMIT, offset: offset })
  )
  return (
    <div className='flex max-w-280 min-w-100 flex-1 flex-col items-center gap-y-10 p-8'>
      <section className='flex min-h-70 flex-col items-center justify-end gap-y-4'>
        <header className='flex flex-col gap-y-3 pb-8 text-center'>
          <h1 className='text-5xl font-bold'>Encuentra tu próximo trabajo</h1>
          <p className='text-lg'>
            Explora miles de oportunidades en el sector tecnológico.
          </p>
        </header>
        <form
          role='search'
          aria-label='Buscar en el sitio'
          className='bg-card relative z-2 flex w-full rounded-xl p-1.5 text-center'
        >
          <Input
            value={inputText}
            placeholder='Buscar empleos por título, habilidad o empresa'
            autoComplete='off'
            onChange={e => setInputText(e.target.value)}
            className='text-card-foreground w-full border-0 outline-none'
            type='search'
            aria-label='Buscar'
          />
        </form>
        <nav className='flex flex-wrap gap-2 self-start'>
          <QueryCombobox
            response={locationResponse}
            currentValue={filters.location_id}
            placeholder='Ubicación'
            setFilterParam={setFilter.location_id}
          />
          <QueryCombobox
            response={technologyResponse}
            currentValue={filters.technology_id}
            placeholder='Tecnología'
            setFilterParam={setFilter.technology_id}
          />
          <EnumCombobox
            options={MODALITY_OPTIONS}
            currentValue={filters.modality}
            placeholder='Modalidad'
            setFilterParam={setModality}
          />
          <EnumCombobox
            options={SENIORITY_OPTIONS}
            currentValue={filters.seniority}
            placeholder='Seniority'
            setFilterParam={setSeniority}
          />
        </nav>
      </section>
      <section className='flex w-4/5 flex-1 flex-col items-center gap-y-8'>
        {isError ? (
          <p className='my-auto p-4'>Error al cargar las ofertas</p>
        ) : !data ? (
          <p className='my-auto p-4'>
            <Loader2 className='animate-spin' />
          </p>
        ) : (
          <>
            {data.count === 0 ? (
              <p className='my-auto p-4 text-center'>
                No se encontraron empleos
              </p>
            ) : (
              <ul className='flex w-full flex-1 flex-col gap-y-3'>
                {data.items.map(offer => (
                  <li key={offer.id}>
                    <OfferCard offer={offer} />
                  </li>
                ))}
              </ul>
            )}
            <Pagination
              pagina={pagina}
              toPagina={toPagina}
              nroPaginas={Math.ceil(data.count / LIMIT)}
            />
          </>
        )}
      </section>
    </div>
  )
}
