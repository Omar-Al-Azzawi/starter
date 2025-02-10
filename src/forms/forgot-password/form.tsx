'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export default function ForgotPassword() {
  const t = useTranslations()
  const locale = useLocale()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    try {
      await authClient.forgetPassword(
        {
          email: data.email,
          redirectTo: `/${locale}/reset-password`,
        },
        {
          onRequest: () => {
            toast(t('Pages.ForgotPassword.sendingResetLink'))
          },
          onSuccess: () => {
            toast.success(t('Pages.ForgotPassword.resetLinkSent'))
            form.reset()
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        },
      )
    } catch (error) {
      console.log({ error })
      toast.error(t('Pages.ForgotPassword.unexpectedError'))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Forms.ForgotPasswordForm.email')}</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <ArrowRight className="h-6 w-6" />
          {t('Forms.ForgotPasswordForm.sendResetLink')}
        </Button>
      </form>
    </Form>
  )
}
