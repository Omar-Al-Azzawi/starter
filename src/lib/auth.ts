// import NextAuth from "next-auth"
// import { DrizzleAdapter } from "@auth/drizzle-adapter"
// import CredentialsProvider from 'next-auth/providers/credentials';
// import db from "@/db"
// import { eq } from "drizzle-orm";
// import { users } from "@/db/schema";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     pages: {
//         signIn: "/",
//     },
//     adapter: DrizzleAdapter(db),
//     callbacks: {
//         session({ session, user }) {
//             session.user.id = user.id;
//             return session;
//         },
//     },
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const email = credentials?.email as string;
//                 const password = credentials?.password as string;

//                 const user = await db.query.users.findFirst({
//                     where: eq(users.email, email),
//                 });

//                 if (!user) return null;
//                 if (user.password !== password) return null;

//                 return user;
//             },
//         }),
//     ],
// })


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
    }
})
