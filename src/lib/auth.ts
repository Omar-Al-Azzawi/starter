import db from "@/db";
import { users, sessions, accounts, verification } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: users,
            session: sessions,
            account: accounts,
            verification: verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignUp: true
    },
    session: {
        expiresIn: 60 * 60 * 24,
        updateAge: 60 * 60 * 24
    }
})
