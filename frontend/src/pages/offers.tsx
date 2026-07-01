import { OfferCard } from '@/components/offer-card'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFilters } from '@/hooks/useFilters'
import { Modality, Seniority } from '@/types/enums'
import { Search } from 'lucide-react'
import { useId } from 'react'

export default function Offers() {
  const {
    offers,
    loading,
    locations,
    technologies,
    inputText,
    manejarInputText,
    handleLocation,
    handleModality,
    handleTechnology,
    handleSeniority,
    NUMERO_DE_PAGINAS,
    pagina,
    cambiarPag,
  } = useFilters()
  const idSearch = useId()
  const idLocation = useId()
  const idModality = useId()
  const idTechnology = useId()
  const idSeniority = useId()
  return (
    <>
      <section className='flex min-h-[30vh] flex-col items-center gap-4'>
        <header className='px-12 py-8 text-center'>
          <h1 className='pb-4 text-6xl font-bold'>
            Encuentra tu próximo trabajo
          </h1>
          <p className='text-lg'>
            Explora miles de oportunidades en el sector tecnológico.
          </p>
        </header>
        <form
          role='search'
          aria-label='Buscar en el sitio'
          className='bg-card relative z-2 flex w-full max-w-187.5 rounded-xl p-1.5 text-center'
        >
          <Input
            name={idSearch}
            id='q'
            type='search'
            placeholder='Buscar empleos por título, habilidad o empresa'
            aria-label='Buscar'
            autoComplete='off'
            className='text-card-foreground w-full border-0 outline-none'
            onChange={e => manejarInputText(e.target.value)}
            defaultValue={inputText}
          />
          <Button variant='ghost' type='submit' aria-label='Enviar búsqueda'>
            <Search />
          </Button>
        </form>
        <nav className='mx-auto flex max-w-250 gap-4 p-2'>
          <select
            className='bg-blue-2 rounded-[10px] border-none p-2 text-white'
            name={idLocation}
            id='filter-location'
            onChange={e => handleLocation(e.target.value)}
          >
            <option value=''>Ubicación</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <select
            className='bg-blue-2 rounded-[10px] border-none p-2 text-white'
            name={idModality}
            id='filter-modality'
            onChange={e => handleModality(e.target.value as Modality | '')}
          >
            <option value=''>Modalidad</option>
            {Object.values(Modality).map(modality => (
              <option key={modality} value={modality}>
                {modality}
              </option>
            ))}
          </select>
          <select
            className='bg-blue-2 rounded-[10px] border-none p-2 text-white'
            name={idTechnology}
            id='filter-technology'
            onChange={e => handleTechnology(e.target.value)}
          >
            <option value=''>Tecnología</option>
            {technologies.map(tech => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>
          <select
            className='bg-blue-2 rounded-[10px] border-none p-2 text-white'
            name={idSeniority}
            id='filter-seniority'
            onChange={e => handleSeniority(e.target.value as Seniority | '')}
          >
            <option value=''>Nivel de experiencia</option>
            {Object.values(Seniority).map(seniority => (
              <option key={seniority} value={seniority}>
                {seniority}
              </option>
            ))}
          </select>
        </nav>
      </section>
      <section>
        <h2>Resultados de búsqueda</h2>
        {loading ? (
          <p className='m-auto text-center'>Cargando...</p>
        ) : (
          <div>
            {offers.length === 0 && (
              <p className='p-4 text-center'>No se encontraron empleos</p>
            )}
            {offers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
        <Pagination
          nroPaginas={NUMERO_DE_PAGINAS}
          paginaActual={pagina}
          cambiarPag={cambiarPag}
        />
      </section>
    </>
  )
}
