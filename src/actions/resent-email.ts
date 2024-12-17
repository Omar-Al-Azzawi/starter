'use server'

import { Resend } from "resend";

type ResendEmailProps = {
    to: string;
    subject: string;
    text: string;
}

export async function resentEmail({ to, subject, text }: ResendEmailProps) {

    if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not set');
    }

    if (!process.env.EMAIL_FROM) {
        throw new Error('EMAIL_FROM is not set');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {   
        const { data } = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: [to],
            subject: subject,
            text: text,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error };
    }
}
