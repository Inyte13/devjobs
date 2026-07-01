import { BriefcaseBusiness, Building2, Search, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()
  const manejarBusqueda = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const terminoDeBusqueda = String(formData.get('search'))
    const url = terminoDeBusqueda
      ? `/offers?title=${encodeURIComponent(terminoDeBusqueda)}` // '' === %20
      : '/offers'
    navigate(url)
  }

  return (
    <>
      <section
        className={cn(
          'relative flex h-[55vh] flex-col items-center justify-center gap-y-9 after:absolute after:z-1',
          'after:inset-0', // Cubre todo el contenedor
          'after:bg-linear-to-b', // Degradado de arriba -> abajo
          'after:from-black/50 after:to-black/80',
          'after:content-[""]' // Content vacío para que renderice
        )}
      >
        <img
          src='..\public\persona-trabajando.jpg'
          alt='persona-trabajando'
          className={cn(
            'absolute top-0 left-0 z-0 h-full w-full',
            'object-cover' // Mantiene la proporción
          )}
        />
        <h1 className='relative z-2 text-center text-6xl font-bold'>
          Encuentra el trabajo de tus sueños
        </h1>
        <p className='relative z-2 max-w-200 text-center text-xl'>
          Únete a la comunidad más grande de desarrolladores y encuentra tu
          próxima oportunidad.
        </p>
        <form
          onSubmit={manejarBusqueda}
          role='search'
          aria-label='Buscar en el sitio'
          className='bg-card relative z-2 flex w-full max-w-187.5 rounded-xl p-1.5 text-center'
        >
          <Input
            name='search'
            id='q'
            type='search'
            placeholder='Buscar empleos por título, habilidad o empresa'
            aria-label='Buscar'
            autoComplete='off'
            className='text-card-foreground w-full border-0 outline-none'
          />
          <Button variant='ghost' type='submit' aria-label='Enviar búsqueda'>
            <Search />
          </Button>
        </form>
      </section>
      <section className='flex min-h-[30vh] flex-col items-center justify-center gap-8 py-20'>
        <h2 className='text-4xl'>¿Por qué DevJobs?</h2>
        <p className='max-w-175 text-center text-xl'>
          DevJobs es la principal bolsa de trabajo para desarrolladores.
          Conectamos a los desarrolladores con las mejores empresas del mundo.
        </p>
        <div className='flex flex-wrap justify-center gap-6 px-4'>
          <article className='bg-card flex max-w-112.5 flex-col gap-4 rounded-xl p-8 text-center'>
            <BriefcaseBusiness className='mx-auto h-12 w-12' />
            <h3 className='text-xl font-bold'>
              Encuentra el trabajo de tus sueños
            </h3>
            <p>
              Busca miles de empleos de las mejores empresas de todo el mundo
            </p>
          </article>
          <article className='bg-card flex max-w-112.5 flex-col gap-4 rounded-xl p-8 text-center'>
            <Users className='mx-auto h-12 w-12' />
            <h3 className='text-xl font-bold'>
              Conecta con las mejores empresas
            </h3>
            <p>
              Conecta con empresas que están contratando por tus habilidades
            </p>
          </article>
          <article className='bg-card flex max-w-112.5 flex-col gap-4 rounded-xl p-8 text-center'>
            <Building2 className='mx-auto h-12 w-12' />
            <h3 className='text-xl font-bold'>Obtén el salario que mereces</h3>
            <p>
              Obtén el salario que mereces con nuestra calculadora de salarios
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
