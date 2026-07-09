import { Modality, Seniority } from '@/types/enums'
import z from 'zod'

export const offerCreate = z.object({
  title: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(3).max(255)
  ),
  description: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(10).max(2000)
  ),
  location_id: z.uuid(),
  modality: z.enum(Modality),
  seniority: z.enum(Seniority),
  technologies_ids: z.array(z.uuid()),
  salary: z.preprocess(
    v => (v === '' ? undefined : v),
    z.number().min(0).optional()
  ),
})

export type OfferCreate = z.output<typeof offerCreate>

export const offerUpdate = z.object({
  title: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(3).max(255).optional()
  ),
  description: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(10).max(2000).optional()
  ),
  location_id: z.uuid().optional(),
  modality: z.enum(Modality).optional(),
  seniority: z.enum(Seniority).optional(),
  technologies_ids: z.array(z.uuid()).optional(),
  salary: z.preprocess(
    v => (v === '' ? undefined : v),
    z.number().min(0).optional()
  ),
})

export type OfferUpdate = z.output<typeof offerUpdate>
