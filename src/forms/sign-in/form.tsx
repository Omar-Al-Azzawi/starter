'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import formSchema from './schema'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

export default function SignIn() {
  const t = useTranslations()
  const locale = useLocale()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values

    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: '/dashboard',
        },
        {
          onRequest: () => {
            toast(t('Pages.SignIn.signingYouIn'))
          },
          onSuccess: () => {
            toast.success(t('Pages.SignIn.signedInSuccessfully'))
            form.reset()
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        },
      )
    } catch (error) {
      console.log({ error })
      toast.error(t('Pages.SignIn.unexpectedError'))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Forms.SignInForm.email')}</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>{t('Forms.SignInForm.password')}</FormLabel>
                <Link href={`/${locale}/forgot-password`} className="text-sm text-secondary-foreground hover:underline">
                  {t('Forms.SignInForm.forgotPassword')}
                </Link>
              </div>
              <FormControl>
                <Input type="password" placeholder={t('Forms.SignInForm.passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="primary" type="submit">
          <ArrowRight className="h-6 w-6" />
        </Button>
      </form>
    </Form>
  )
}
