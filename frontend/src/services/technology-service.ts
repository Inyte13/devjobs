import { TechnologyResponse } from '@/types/technology'

const BASE_URL = import.meta.env.VITE_API_URL || ''
const URL = `${BASE_URL}/api/technologies`

export async function getAllTechnologies(): Promise<TechnologyResponse[]> {
  const res = await fetch(`${URL}/`)
  if (!res.ok) throw new Error('Error al obtener las tecnologías')
  return res.json()
}
