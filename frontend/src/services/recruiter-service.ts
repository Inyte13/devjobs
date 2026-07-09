import { BASE_URL } from '@/lib/constants'
import { HttpError } from './errors'
import { RecruiterResponsePrivate } from '@/types/recruiter'
import { authFetch } from './dependencies'

const URL = `${BASE_URL}/api/recruiters`
export async function getMeRecruiter(): Promise<RecruiterResponsePrivate | null> {
  const res = await authFetch(`${URL}/me`)
  if (res.status === 403) return null // 403 cuando no tiene ese perfil
  if (!res.ok) throw new HttpError(res.status, 'Error al obtener al recruiter')
  return res.json()
}
