import { Modality, Seniority } from '@/types/enums'
import { OfferResponseDetail, OfferResponseSummary } from '@/types/offer'

const BASE_URL = import.meta.env.VITE_API_URL || ''
const URL = `${BASE_URL}/api/offers`

export async function getAllOffers(
  title?: string,
  location_id?: string,
  modality?: Modality,
  technology_id?: string,
  seniority?: Seniority,
  limit?: number,
  offset?: number
): Promise<{ items: OfferResponseSummary[]; count: number }> {
  const params = new URLSearchParams()
  if (title !== undefined) params.append('title', title)
  if (location_id !== undefined) params.append('location_id', location_id)
  if (modality !== undefined) params.append('modality', modality)
  if (technology_id !== undefined) params.append('technology_id', technology_id)
  if (seniority !== undefined) params.append('seniority', seniority)
  if (limit !== undefined) params.append('limit', String(limit))
  if (offset !== undefined) params.append('offset', String(offset))

  const res = await fetch(`${URL}/?${params.toString()}`)
  if (!res.ok) throw new Error('Error al obtener las ofertas')
  return res.json()
}

export async function getOffer(id: string): Promise<OfferResponseDetail> {
  const res = await fetch(`${URL}/${id}`)
  if (!res.ok) throw new Error('Error al obtener la oferta')
  return res.json()
}
