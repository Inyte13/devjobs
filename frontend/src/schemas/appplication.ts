import { Status } from '@/types/enums'
import z from 'zod'

export const applicationCreate = z.object({ offer_id: z.uuid() })
export type ApplicationCreate = z.infer<typeof applicationCreate>

export const applicationUpdate = z.object({ status: z.enum(Status).optional() })
export type ApplicationUpdate = z.infer<typeof applicationUpdate>
