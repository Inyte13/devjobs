import { BASE_URL } from '@/lib/constants'
import { ApplicationCreate } from '@/schemas/appplication'
import { ApplicationResponseCandidate } from '@/types/application'
import { authFetch } from './dependencies'
import { HttpError } from './errors'

const URL = `${BASE_URL}/api/applications`

export async function getAllMeApplications(): Promise<
  ApplicationResponseCandidate[]
> {
  const res = await authFetch(`${URL}/me`)
  if (!res.ok)
    throw new HttpError(res.status, 'Error al obtener las applicaciones')
  return res.json()
}

export async function createApplication(
  application: ApplicationCreate
): Promise<ApplicationResponseCandidate> {
  const res = await authFetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application),
  })
  if (!res.ok) throw new HttpError(res.status, 'Error al aplicar a la oferta')
  return res.json()
}
