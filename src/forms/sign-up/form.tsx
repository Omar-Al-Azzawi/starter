'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ArrowRight, Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import formSchema from './schema'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export function SignUp() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)
    const { name, email, password } = values
    try {
      await authClient.signUp.email(
        {
          name,
          email,
          password,
          callbackURL: '/auth/sign-in',
        },
        {
          onRequest: () => {
            toast(t('Pages.SignUp.creatingAccount'))
          },
          onSuccess: () => {
            toast.success(t('Pages.SignUp.accountCreatedSuccessfully'))
            form.reset()
            router.push(`/${locale}/sign-in`)
          },
          onError: (ctx) => {
            console.log({ ctx })
            toast.error(ctx.error.message)
            form.setError('email', {
              type: 'manual',
              message: ctx.error.message,
            })
          },
        },
      )
    } catch (error) {
      console.log({ error })
      toast.error(t('Pages.SignUp.unexpectedError'))
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Pages.SignUp.username')}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Pages.SignUp.email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
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
              <FormLabel>{t('Pages.SignUp.password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="primary" type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
        </Button>
      </form>
    </Form>
  )
}
