import {
  Filters,
  OfferResponseDetail,
  OfferResponseSummary,
} from '@/types/offer'
import { HttpError } from './errors'
import { BASE_URL } from '@/lib/constants';

const URL = `${BASE_URL}/api/offers`

export async function getAllOffers({
  title,
  location_id,
  modality,
  technology_id,
  seniority,
  limit,
  offset,
}: Filters): Promise<{ items: OfferResponseSummary[]; count: number }> {
  const params = new URLSearchParams()
  if (title !== null) params.append('title', title)
  if (location_id !== null) params.append('location_id', location_id)
  if (modality !== null) params.append('modality', modality)
  if (technology_id !== null) params.append('technology_id', technology_id)
  if (seniority !== null) params.append('seniority', seniority)
  if (limit !== null) params.append('limit', String(limit))
  if (offset !== null) params.append('offset', String(offset))
  const res = await fetch(`${URL}?${params.toString()}`)
  if (!res.ok) throw new HttpError(res.status, 'Error al obtener las ofertas')
  return res.json()
}

export async function getOffer(id: string): Promise<OfferResponseDetail> {
  const res = await fetch(`${URL}/${id}`)
  if (!res.ok) throw new HttpError(res.status, 'Error al obtener la oferta')
  return res.json()
}
