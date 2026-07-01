import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  paginaActual = 1,
  nroPaginas = 5,
  cambiarPag,
}: {
  paginaActual?: number
  nroPaginas?: number
  cambiarPag: (page: number) => void
}) {
  const paginas = Array.from({ length: nroPaginas }, (_, index) => index + 1)
  const aOpaco = { pointerEvents: 'none', opacity: 0.5 }

  const manejarPrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    cambiarPag(paginaActual - 1)
  }
  const manejarNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    cambiarPag(paginaActual + 1)
  }
  const urlPag = (paginaActual: number) => {
    const url = new URL(window.location.href)
    // Cambiamos los params
    url.searchParams.set('pagina', String(paginaActual))
    return `${url.pathname}?${url.searchParams.toString()}`
  }
  return (
    <nav className='my-8 flex justify-center gap-2'>
      <a
        href={urlPag(paginaActual - 1)}
        onClick={manejarPrevClick}
        className={`text-foreground/70 hover:bg-accent flex h-10 w-10 items-center justify-center rounded-md ${
          paginaActual === 1 ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <ChevronLeft />
      </a>
      {paginas.map(pagina => (
        <a
          key={pagina}
          href={urlPag(pagina)}
          className={`flex h-10 w-10 items-center justify-center rounded-md ${
            paginaActual === pagina
              ? 'bg-primary text-primary-foreground pointer-events-none'
              : 'text-foreground/70 hover:bg-accent'
          }`}
          onClick={e => {
            e.preventDefault()
            cambiarPag(pagina)
          }}
        >
          {pagina}
        </a>
      ))}
      <a
        href={urlPag(paginaActual + 1)}
        className={`text-foreground/70 hover:bg-accent flex h-10 w-10 items-center justify-center rounded-md ${
          paginaActual === nroPaginas ? 'pointer-events-none opacity-50' : ''
        }`}
        onClick={manejarNextClick}
      >
        <ChevronRight />
      </a>
    </nav>
  )
}
