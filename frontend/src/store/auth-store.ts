import { create } from 'zustand'
import { getAccessToken, saveTokens, clearTokens } from '@/lib/storage'
import { userKeys } from '@/queries/user.queries'
import { queryClient } from '@/lib/query-client'

interface AuthState {
  isAuthenticated: boolean
  activeRole: 'candidate' | 'recruiter' | null
  setActiveRole: (role: 'candidate' | 'recruiter') => void
  login: (access: string, refresh: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: getAccessToken() !== null,
  activeRole: null,
  setActiveRole: role => {
    set({ activeRole: role })
  },
  login: (access, refresh) => {
    saveTokens(access, refresh)
    set({ isAuthenticated: true })
  },

  logout: () => {
    clearTokens()
    set({ activeRole: null, isAuthenticated: false })
    queryClient.removeQueries({ queryKey: userKeys.me })
  },
}))
