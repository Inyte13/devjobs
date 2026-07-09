import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { login as loginSchema, Login } from '@/schemas/auth'
import { login as loginService } from '@/services/auth-service'
import { HttpError } from '@/services/errors'
import { useAuthStore } from '@/store/auth-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'

export function Login() {
  // formState: errors, isSubmitting, isValid
  const { handleSubmit, control, formState } = useForm<Login>({
    // Validar el schema de zod
    resolver: zodResolver(loginSchema), // zodResolver usa safeParse() que en lugar de tirarte un throw (como parse()) te devuelve un obj
    defaultValues: { username: '', password: '' },
  })

  const setAuth = useAuthStore(s => s.login)
  const navigate = useNavigate()
  const location = useLocation()

  const [error, setError] = useState<string | null>(null)
  const submit = async (credentials: Login) => {
    try {
      setError(null)
      const res = await loginService(credentials)
      setAuth(res.access, res.refresh)

      // Recibiendo el state, que sería el path anterior para devolverlo a la página en la que estaba
      const state = location.state as string | null
      navigate(state ?? '/', { replace: true })
    } catch (e) {
      setError(e instanceof HttpError ? e.message : 'Algo salió mal')
    }
  }
  const isCargando = formState.isSubmitting
  return (
    <div className='flex min-h-57 w-full max-w-148 flex-col gap-y-4'>
      <h1 className='text-4xl font-semibold'>Iniciar sesión</h1>
      <form className='flex flex-col gap-y-3' onSubmit={handleSubmit(submit)}>
        <Controller
          name='username'
          control={control}
          // field: value, onChange, onBlur, name, ref
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className='sr-only' htmlFor={field.name}>
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  className='h-12'
                  placeholder='Username'
                  id={field.name}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
        />
        <Controller
          name='password'
          control={control}
          // field: value, onChange, onBlur, name, ref
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className='sr-only' htmlFor={field.name}>
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  className='h-12'
                  placeholder='Password'
                  type='password'
                  autoComplete='off'
                  id={field.name}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
        />
        <div className='flex items-center justify-end gap-x-6'>
          <Link to='/register' className='font-medium underline'>
            Create a new account instead
          </Link>
          <Button className='h-11' type='submit' disabled={isCargando}>
            {isCargando ? <Loader2 className='animate-spin' /> : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  )
}
