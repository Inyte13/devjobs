import { LocationResponseDetail } from '@/types/location'

const BASE_URL = import.meta.env.VITE_API_URL || ''
const URL = `${BASE_URL}/api/locations`

export async function getAllLocations(): Promise<LocationResponseDetail[]> {
  const res = await fetch(`${URL}/`)
  if (!res.ok) throw new Error('Error al obtener las ubicaciones')
  return res.json()
}
