'use client'

import { useState, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Loader2, Check, Circle } from 'lucide-react'

const passwordRequirements = [
  { id: 'length', regex: /.{8,}/ },
  { id: 'uppercase', regex: /[A-Z]/ },
  { id: 'lowercase', regex: /[a-z]/ },
  { id: 'number', regex: /\d/ },
  { id: 'special', regex: /[!@#$%^&*(),.?":{}|<>]/ },
]

const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

function ResetPasswordContent() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [isPending, setIsPending] = useState(false)
  const [meetsRequirements, setMeetsRequirements] = useState<Record<string, boolean>>({})

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    const newPassword = form.watch('newPassword')
    const newMeetsRequirements = passwordRequirements.reduce(
      (acc, requirement) => {
        acc[requirement.id] = requirement.regex.test(newPassword)
        return acc
      },
      {} as Record<string, boolean>,
    )
    setMeetsRequirements(newMeetsRequirements)
  }, [form.watch('newPassword')])

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setIsPending(true)
    const { error } = await authClient.changePassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
    })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password changed successfully.')
      router.push('/dashboard')
    }
    setIsPending(false)
  }

  if (error === 'invalid_token') {
    return (
      <div className="grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              {t('Pages.ResetPassword.invalidResetLink')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-gray-600">{t('Pages.ResetPassword.invalidResetLinkDescription')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Pages.ChangePassword.currentPassword')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('Pages.ChangePassword.currentPasswordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Pages.ChangePassword.newPassword')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('Pages.ChangePassword.newPasswordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Pages.ChangePassword.confirmPassword')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('Pages.ChangePassword.confirmPasswordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">{t('Pages.ChangePassword.passwordRequirements')}</h3>
          <ul className="space-y-1">
            {passwordRequirements.map((requirement) => (
              <li key={requirement.id} className="flex items-center text-sm">
                {meetsRequirements[requirement.id] ? (
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-300 mr-2" />
                )}
                <span className={meetsRequirements[requirement.id] ? 'text-green-500' : 'text-gray-500'}>
                  {t(`Pages.ChangePassword.${requirement.id}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button variant="primary" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('Pages.ChangePassword.changing')}
            </>
          ) : (
            t('Pages.ChangePassword.changePassword')
          )}
        </Button>
      </form>
    </Form>
  )
}

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  )
}
