import z from 'zod'

export const recruiterCreate = z.object({
  description: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(2).max(500).optional()
  ),
  company_id: z.uuid(),
  contact_email: z.email(),
})

export type RecruiterCreate = z.infer<typeof recruiterCreate>

export const recruiterUpdate = z.object({
  description: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(2).max(500).optional()
  ),
  company_id: z.uuid().optional(),
  contact_email: z.email().optional(),
})

export type RecruiterUpdate = z.infer<typeof recruiterUpdate>
