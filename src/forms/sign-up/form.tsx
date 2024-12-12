"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Rocket } from 'lucide-react'
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import formSchema from "./schema"

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, email, password } = values;
        try {
            await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/auth/sign-in",
            }, {
                onRequest: () => {
                    toast("Creating your account...")
                },
                onSuccess: () => {
                    toast.success("Account created successfully! Please sign in.")
                    form.reset()
                },
                onError: (ctx) => {
                    console.log({ ctx })
                    toast.error(ctx.error.message);
                    form.setError('email', {
                        type: 'manual',
                        message: ctx.error.message
                    })
                },
            });
        } catch (error) {
            console.log({ error })
            toast.error("An unexpected error occurred. Please try again.")
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
                            <FormLabel>Username</FormLabel>
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
                            <FormLabel>Email</FormLabel>
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Sign Up <Rocket className="w-4 h-4 ml-2" />
                </Button>
            </form>
        </Form>
    )
}

