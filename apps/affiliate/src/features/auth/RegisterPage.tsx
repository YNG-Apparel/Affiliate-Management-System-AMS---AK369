import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { z } from 'zod'
import { UserPlus, CheckCircle2 } from 'lucide-react'
import { apiFetch, ApiError } from '../../lib/api'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Nama minimal 2 karakter').max(150),
  email: z.email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter').max(128),
})

type RegisterForm = z.infer<typeof registerSchema>

interface RegisterResponse {
  message: string
}

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: (data: RegisterForm) =>
      apiFetch<RegisterResponse>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  })

  const serverError =
    mutation.error instanceof ApiError
      ? mutation.error.message
      : mutation.error
        ? 'Terjadi kesalahan. Coba lagi.'
        : null

  // Success screen: registration is submitted, waiting for manager approval.
  if (mutation.isSuccess) {
    return (
      <div className="flex min-h-full items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
          <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Pendaftaran Terkirim!</h1>
          <p className="mt-2 text-sm text-gray-500">
            Akun Anda sedang menunggu persetujuan manajer. Anda akan dapat masuk setelah disetujui.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Kembali ke halaman masuk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Daftar Afiliator</h1>
          <p className="mt-1 text-sm text-gray-500">Buat akun untuk bergabung</p>
        </div>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4" noValidate>
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Lengkap
            </label>
            <Input id="fullName" type="text" placeholder="Nama lengkap Anda" {...register('fullName')} />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input id="email" type="email" autoComplete="email" placeholder="nama@email.com" {...register('email')} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input id="password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" {...register('password')} />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {serverError && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
              {serverError}
            </div>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            <UserPlus className="mr-2 h-4 w-4" />
            {mutation.isPending ? 'Memproses…' : 'Daftar'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  )
}
