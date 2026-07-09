import { BASE_URL } from '@/lib/constants'
import { HttpError } from './errors'
import { CandidateResponsePrivate } from '@/types/candidate'
import { authFetch } from './dependencies'

const URL = `${BASE_URL}/api/candidates`
export async function getMeCandidate(): Promise<CandidateResponsePrivate | null> {
  const res = await authFetch(`${URL}/me`)
  if (res.status === 403) return null // 403 cuando no tiene ese perfil
  if (!res.ok) throw new HttpError(res.status, 'Error al obtener al candidate')
  return res.json()
}
