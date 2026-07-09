import { Seniority } from '@/types/enums'
import z from 'zod'

export const candidateCreate = z.object({
  description: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(2).max(500).optional()
  ),
  seniority: z.enum(Seniority),
  experience_years: z.number().min(0).max(50),
})

export type CandidateCreate = z.output<typeof candidateCreate>

export const candidateUpdate = z.object({
  description: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(2).max(500).optional()
  ),
  seniority: z.enum(Seniority).optional(),
  experience_years: z.number().min(0).max(50).optional(),
})

export type CandidateUpdate = z.output<typeof candidateUpdate>
