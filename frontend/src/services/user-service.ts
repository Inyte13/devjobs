import { BASE_URL } from '@/lib/constants'
import { UserResponsePrivate } from '@/types/user'
import { HttpError } from './errors'

const URL = `${BASE_URL}/api/users`
export async function getMeUser(): Promise<UserResponsePrivate> {
  const res = await fetch(`${URL}/me`)
  if (!res.ok) throw new HttpError(res.status, 'Error al obtener al usuario')
  return res.json()
}
