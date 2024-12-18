# Next.js Starter kit Project

## Tools Used

- [Next.js v15](https://nextjs.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better-Auth](https://www.better-auth.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Prettier](https://prettier.io/)
- [Next-Intl](https://next-intl.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Resend](https://resend.com/)

## Locale development guidelines

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Omar-Al-Azzawi/starter.git
   cd starter
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Open Your Browser**

   - Visit `http://localhost:3000` to view the application.

5. **Lint and Format Code**

   - Use Prettier to format your code:
     ```bash
     npm run format
     ```

6. **Internationalization**

   - Use Next-Intl for managing translations.
   - Add your translations to the `messages` folder.

   **_Example_**

   ```json
   {
     "HomePage": { "title": "Home Page" }
   }
   ```

   - Use the `useTranslations` hook to get the translations in your client components.

   ```tsx
   import { useTranslations } from 'next-intl'

   const t = useTranslations('HomePage')
   return <h1>{t('title')}</h1>
   ```

   - Use the `useLocale` hook to get the current locale.

   ```tsx
   import { useLocale } from 'next-intl'

   const locale = useLocale()
   return (
     <Link href={`/${locale}`}>
       <Button>{locale}</Button>
     </Link>
   )
   ```

   - Use the `getTranslations` function to get the translations in your server components.

   ```tsx
   import { getTranslations } from 'next-intl/server'

   const t = await getTranslations('HomePage')
   return {
     messages: {
       title: t('title'),
     },
   }
   ```

   - Use the `getLocale` function to get the current locale in your server components.

   ```tsx
   import { getLocale } from 'next-intl/server'

   const locale = await getLocale()
   return {
     locale,
   }
   ```

7. **Authentication**

   - Authentication using Better-Auth, visit [Better-Auth](https://www.better-auth.com/docs/installation) to get started and generate a secret key and add it to the `.env` file `BETTER_AUTH_SECRET_KEY`.

8. **Database**

   - Use Drizzle ORM for database operations.

   **Setup Drizzle ORM**

   - **Configure Database Connection**

     - Create a `.env` file in the root of your project and add your database connection string:
       ```env
       DATABASE_URL=your_database_connection_string
       ```

   - **Initialize Drizzle**

     - Run the following command to initialize Drizzle in your project:
       ```bash
        npm run db init
       ```

   - **Run Migrations**

     - Apply migrations to your database:
       ```bash
        npm run db migrate
       ```

   - **Generate Models**

     - Generate models based on your database schema:

     **_Example_**

     ```js
     // src/db/schema/users.ts
      const users = pgTable('users', {
          id: text('id').primaryKey().default(sql`gen_random_uuid()`),
          name: text('name').notNull(),
          email: text('email').notNull().unique(),
          emailVerified: boolean('emailVerified').notNull(),
          image: text('image'),

     export type User = typeof users.$inferSelect
     export default users
     ```

     - Add the models to the `schema/index.ts` file:

     ```js
     // src/db/schema/index.ts
     export { default as users } from './users'
     ```

     - Run the following command to generate the models:

     ```bash
      npm run db generate
     ```

   - **Push to Database**

     - Push the migrations or generate models to the database:
       ```bash
        npm run db push
       ```

   - **Seed Database**

     - Seed the database with initial data:
       ```bash
        npm run db:seed
       ```

9. **UI Components**

   - Utilize Shadcn for UI components.

10. **Resend**

    - Setup Resend for email notifications, visit [Resend](https://resend.com/) to get started and get your API key and add it to the `.env` file.
