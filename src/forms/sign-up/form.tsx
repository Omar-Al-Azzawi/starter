'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import formSchema from './schema'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export function SignUp() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        <Button
          variant="primary"
          // className="w-14 h-14 rounded-2xl bg-[#e86b67] hover:bg-[#e55853] mt-4"
          type="submit"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </form>
    </Form>
  )
}
