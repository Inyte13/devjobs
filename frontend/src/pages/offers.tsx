import { OfferCard } from '@/components/offer-card'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
    locationFilter,
    handleLocation,
    modalityFilter,
    handleModality,
    technologyFilter,
    handleTechnology,
    seniorityFilter,
    handleSeniority,
    NUMERO_DE_PAGINAS,
    pagina,
    cambiarPag,
  } = useFilters()
  const idSearch = useId()
  return (
    <div className='flex flex-col items-center'>
      <section className='flex min-h-70 flex-col items-center justify-center gap-y-4 px-6 pt-8'>
        <header className='flex flex-col gap-y-3 text-center'>
          <h1 className='text-6xl font-bold'>Encuentra tu próximo trabajo</h1>
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
            name={idSearch}
            id='search'
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
        <nav className='flex gap-4 p-1.5 self-start'>
          <Select
            value={locationFilter || undefined}
            onValueChange={handleLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder='Ubicación' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ubicación</SelectLabel>
                {locations.map(location => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={modalityFilter || undefined}
            onValueChange={value => handleModality(value as Modality | '')}
          >
            <SelectTrigger className='capitalize'>
              <SelectValue placeholder='Modalidad' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Modalidad</SelectLabel>
                {Object.values(Modality).map(modality => (
                  <SelectItem
                    className='capitalize'
                    key={modality}
                    value={modality}
                  >
                    {modality}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={technologyFilter || undefined}
            onValueChange={handleTechnology}
          >
            <SelectTrigger className='*:data-[slot=select-value]:inline-block *:data-[slot=select-value]:lowercase *:data-[slot=select-value]:first-letter:uppercase'>
              <SelectValue placeholder='Tecnología' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tecnología</SelectLabel>
                {technologies.map(tech => (
                  <SelectItem
                    className='*:[span]:last:inline-block *:[span]:last:lowercase *:[span]:last:first-letter:uppercase'
                    key={tech.id}
                    value={tech.id}
                  >
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={seniorityFilter || undefined}
            onValueChange={value => handleSeniority(value as Seniority | '')}
          >
            <SelectTrigger className='capitalize'>
              <SelectValue placeholder='Nivel de experiencia' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nivel de experiencia</SelectLabel>
                {Object.values(Seniority).map(seniority => (
                  <SelectItem
                    className='capitalize'
                    key={seniority}
                    value={seniority}
                  >
                    {seniority}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </nav>
      </section>
      <section className='flex w-full max-w-230 min-w-100 flex-col items-center p-6 gap-y-2'>
        <h2 className='self-start text-xl font-light'>
          Resultados de búsqueda
        </h2>
        {loading ? (
          <p className='m-auto text-center'>Cargando...</p>
        ) : (
          <div className='flex w-full flex-col gap-y-3'>
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
    </div>
  )
}
