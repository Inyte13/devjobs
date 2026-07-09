import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { userCreate, UserCreate, UserCreateInput } from '@/schemas/user'
import { register } from '@/services/auth-service'
import { HttpError } from '@/services/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

export function Register() {
  // formState: errors, isSubmitting, isValid
  const { handleSubmit, control, formState } = useForm<
    UserCreateInput,
    // any es TContext, un tipo para pasar contexto extra a los validators, rara vez se usa any no causa problemas
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    UserCreate
  >({
    // Validar el schema de zod
    resolver: zodResolver(userCreate), // zodResolver usa safeParse() que en lugar de tirarte un throw (como parse()) te devuelve un obj
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  })

  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const submit = async (user: UserCreate) => {
    try {
      setError(null)
      await register(user)
      navigate('/login')
    } catch (e) {
      setError(e instanceof HttpError ? e.message : 'Algo salió mal')
    }
  }
  const isCargando = formState.isSubmitting
  return (
    <div className='flex min-h-57 w-full max-w-148 flex-col gap-y-4'>
      <h1 className='text-4xl font-semibold'>Regístrate</h1>
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
          name='first_name'
          control={control}
          // field: value, onChange, onBlur, name, ref
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className='sr-only' htmlFor={field.name}>
                  First name
                </FieldLabel>
                <Input
                  {...field}
                  className='h-12'
                  placeholder='First name'
                  id={field.name}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
        />
        <Controller
          name='last_name'
          control={control}
          // field: value, onChange, onBlur, name, ref
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className='sr-only' htmlFor={field.name}>
                  Last name
                </FieldLabel>
                <Input
                  {...field}
                  className='h-12'
                  placeholder='First name'
                  id={field.name}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
        />
        <Controller
          name='email'
          control={control}
          // field: value, onChange, onBlur, name, ref
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel className='sr-only' htmlFor={field.name}>
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  className='h-12'
                  placeholder='Email'
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
                  id={field.name}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
        />
        <div className='flex items-center justify-end gap-x-6'>
          <Link to='/login' className='font-medium underline'>
            Sign in with your account instead
          </Link>
          <Button className='h-11' type='submit' disabled={isCargando}>
            {isCargando ? <Loader2 className='animate-spin' /> : 'Register'}
          </Button>
        </div>
      </form>
    </div>
  )
}
