'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import formSchema from "./schema";
import { toast } from "sonner";
import { LogIn } from 'lucide-react';

export default function SignIn() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;

        try {
            await authClient.signIn.email({
                email,
                password,
                callbackURL: "/dashboard",
            }, {
                onRequest: () => {
                    toast("Signing you in...")
                },
                onSuccess: () => {
                    toast.success("Signed in successfully!")
                    form.reset()
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            });
        } catch (error) {
            console.log({ error })
            toast.error("An unexpected error occurred. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input className="w-full" type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full bg-black hover:bg-black/90 text-white" type="submit">
                    Sign In <LogIn className="w-4 h-4 ml-2" />
                </Button>
            </form>
        </Form>
    )
}

