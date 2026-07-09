import { queryClient } from '@/lib/query-client'
import {
  createApplication,
  getAllMeApplications,
} from '@/services/application-service'
import { validateRetry } from '@/services/errors'
import { queryOptions, useMutation } from '@tanstack/react-query'
import { offerKeys } from './offer.queries'

export const applicationKeys = {
  all: ['applications'] as const,
}

export function applicationOptions(role: 'candidate' | 'recruiter' | null) {
  return queryOptions({
    queryKey: applicationKeys.all,
    queryFn: () => getAllMeApplications(),
    retry: validateRetry(2),
    enabled: role === 'candidate',
  })
}

export function useCreateApplication(id: string) {
  return useMutation({
    mutationFn: () => createApplication({ offer_id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      queryClient.invalidateQueries({ queryKey: offerKeys.detail(id) })
    },
  })
}
