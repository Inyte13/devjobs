import { getAccessToken } from '@/lib/storage'
import { Navigate, Outlet } from 'react-router'

export function AuthLayout() {
  if (getAccessToken() !== null) return <Navigate to='/' replace />
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center'>
      <Outlet />
    </main>
  )
}
