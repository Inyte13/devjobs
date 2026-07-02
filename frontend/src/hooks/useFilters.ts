import { getAllLocations } from '@/services/location-service'
import { getAllOffers } from '@/services/offer-service'
import { getAllTechnologies } from '@/services/technology-service'
import { Modality, Seniority } from '@/types/enums'
import { LocationResponseDetail } from '@/types/location'
import { OfferResponseSummary } from '@/types/offer'
import { TechnologyResponse } from '@/types/technology'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'

const OFFERS_POR_PAGINA = 3

export function useFilters() {
  // Usamos useRef para la persistencia, donde la variable inicializada estará en 'current'
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagina, setPagina] = useState(() => {
    const urlPag = searchParams.get('pagina')
    return urlPag ? Number(urlPag) : 1
  })
  const cambiarPag = (page: number) => {
    setPagina(page)
  }
  // Es una fx para que se ejecute una vez
  const [inputText, setInputText] = useState(
    () => searchParams.get('text') || ''
  )
  const manejarInputText = (value: string) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(() => {
      setInputText(value)
    }, 500)
    setPagina(1)
  }

  const [locationFilter, setLocationFilter] = useState(
    () => searchParams.get('location_id') || ''
  )
  const handleLocation = (value: string) => {
    setLocationFilter(value)
    setPagina(1)
  }

  const [modalityFilter, setmodalityFilter] = useState<Modality | ''>(
    () => (searchParams.get('modality') as Modality) || ''
  )
  const handleModality = (value: Modality | '') => {
    setmodalityFilter(value)
    setPagina(1)
  }

  const [technologyFilter, setTechnologyFilter] = useState(
    () => searchParams.get('technology_id') || ''
  )
  const handleTechnology = (value: string) => {
    setTechnologyFilter(value)
    setPagina(1)
  }

  const [seniorityFilter, setSeniorityFilter] = useState<Seniority | ''>(
    () => (searchParams.get('seniority') as Seniority) || ''
  )
  const handleSeniority = (value: Seniority | '') => {
    setSeniorityFilter(value)
    setPagina(1)
  }

  const [offers, setOffers] = useState<OfferResponseSummary[]>([])
  const [total, setTotal] = useState(0)
  const [locations, setLocations] = useState<LocationResponseDetail[]>([])
  const [technologies, setTechnologies] = useState<TechnologyResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [locations, technologies] = await Promise.all([
          getAllLocations(),
          getAllTechnologies(),
        ])
        setLocations(locations)
        setTechnologies(technologies)
      } catch (error) {
        console.error('Error fetching filter options:', error)
      }
    }
    fetchOptions()
  }, [])

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true)
        const offset = (pagina - 1) * OFFERS_POR_PAGINA
        const json = await getAllOffers(
          inputText || undefined,
          locationFilter || undefined,
          (modalityFilter as Modality) || undefined,
          technologyFilter || undefined,
          (seniorityFilter as Seniority) || undefined,
          OFFERS_POR_PAGINA,
          offset
        )
        setOffers(json.items)
        setTotal(json.count)
      } catch (error) {
        console.error('Error fetching offers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
  }, [
    inputText,
    technologyFilter,
    locationFilter,
    modalityFilter,
    seniorityFilter,
    pagina,
  ])

  useEffect(() => {
    setSearchParams(params => {
      if (inputText) params.set('title', inputText)
      else params.delete('title')

      if (technologyFilter) params.set('technology_id', technologyFilter)
      else params.delete('technology_id')

      if (locationFilter) params.set('location_id', locationFilter)
      else params.delete('location_id')

      if (modalityFilter) params.set('modality', modalityFilter)
      else params.delete('modality')

      if (seniorityFilter) params.set('seniority', seniorityFilter)
      else params.delete('seniority')

      if (pagina > 1) params.set('pagina', String(pagina))
      else params.delete('pagina')

      return params
    })
  }, [
    inputText,
    technologyFilter,
    locationFilter,
    modalityFilter,
    seniorityFilter,
    pagina,
  ])

  // Para calcular el número de páginas, usando el total
  const NUMERO_DE_PAGINAS = Math.ceil(total / OFFERS_POR_PAGINA)

  return {
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
  }
}
