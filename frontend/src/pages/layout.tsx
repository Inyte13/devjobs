import { Header } from '@/components/header'
import { candidateOptions } from '@/queries/candidate.queries'
import { recruiterOptions } from '@/queries/recruiter.queries'
import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export function Layout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const role = useAuthStore(s => s.role)
  const setRole = useAuthStore(s => s.setRole)
  const { data: candidate } = useQuery(candidateOptions(isAuthenticated))
  const { data: recruiter } = useQuery(recruiterOptions(isAuthenticated))

  useEffect(() => {
    if (role !== null) return
    if (candidate === undefined || recruiter === undefined) return
    if (candidate) {
      setRole('candidate')
    } else if (recruiter) {
      setRole('recruiter')
    }
  }, [candidate, recruiter, role, setRole])
  // Outlet: Si hay un hijo route lo renderiza
  return (
    <>
      <Header />
      <main className='flex h-[calc(100vh-53px)] flex-col items-center overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <Outlet />
        <footer className='border-border w-full border-t p-4 text-center'>
          <p>&copy; 2025 DevJobs. Todos los derechos reservados.</p>
        </footer>
      </main>
    </>
  )
}
