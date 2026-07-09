import z from 'zod'

export const login = z.object({
  username: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[\w.@+-]+$/),
  password: z.string().min(1),
})

export type Login = z.output<typeof login>
