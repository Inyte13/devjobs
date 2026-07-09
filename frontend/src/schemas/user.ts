import z from 'zod'

export const userCreate = z.object({
  username: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[\w.@+-]+$/),
  first_name: z
    .string()
    .transform(v => (v === '' ? undefined : v))
    .pipe(z.string().min(2).max(150).optional()),
  last_name: z
    .string()
    .transform(v => (v === '' ? undefined : v))
    .pipe(z.string().min(2).max(150).optional()),
  email: z.email(),
  password: z.string().min(1),
})

export type UserCreateInput = z.input<typeof userCreate>
export type UserCreate = z.output<typeof userCreate>

export const userUpdate = z.object({
  username: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[\w.@+-]+$/)
    .optional(),
  first_name: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(2).max(150).optional()
  ),
  last_name: z.preprocess(
    v => (v === '' ? undefined : v),
    z.string().min(2).max(150).optional()
  ),
  email: z.email().optional(),
  password: z.string().min(1).optional(),
})

export type UserUpdate = z.output<typeof userUpdate>
