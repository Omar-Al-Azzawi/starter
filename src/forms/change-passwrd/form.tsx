'use client'

import { useState, Suspense } from 'react'
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
import { Loader2 } from 'lucide-react'

const resetPasswordSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

function ResetPasswordContent() {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setIsPending(true)
    const { error } = await authClient.changePassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword
    })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password reset successful. Login to continue.')
      router.push('/sign-in')
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

        <Button variant="primary" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
