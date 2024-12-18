# Next.js Starter Kit

Welcome to the Next.js Starter Kit! This project leverages modern tools and best practices to help you kickstart your application development.

## Tools and Technologies

- [Next.js v15](https://nextjs.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better-Auth](https://www.better-auth.com/)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [Prettier](https://prettier.io/)
- [Next-Intl](https://next-intl.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Resend](https://resend.com/)

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Omar-Al-Azzawi/starter.git
cd starter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Code Formatting

Ensure consistent code formatting with Prettier:

```bash
npm run format
```

## Internationalization (i18n)

This project uses Next-Intl for localization. Follow these steps to manage translations:

1. Add translations to the `src/messages` folder.

   **Example:**

   ```json
   // src/messages/en.json
   {
     "HomePage": {
       "title": "Home Page"
     }
   }
   ```

2. Access translations in client components using `useTranslations`:

   ```tsx
   import { useTranslations } from 'next-intl'

   const t = useTranslations('HomePage')
   return <h1>{t('title')}</h1>
   ```

3. Access translations in server components using `getTranslations`:

   ```tsx
   import { getTranslations } from 'next-intl/server'

   const t = await getTranslations('HomePage')
   return {
     messages: {
       title: t('title'),
     },
   }
   ```

4. Determine the current locale using `useLocale` or `getLocale`:

   ```tsx
   import { useLocale } from 'next-intl'

   const locale = useLocale()
   return <span>{locale}</span>
   ```

## Authentication

Integrate authentication using Better-Auth:

1. Visit [Better-Auth documentation](https://www.better-auth.com/docs/installation) to set up.
2. Add your secret key to the `.env` file:

   ```env
   BETTER_AUTH_SECRET_KEY=your_secret_key
   ```

## Database Management

This project uses Drizzle ORM for database operations.

1. **Configure Database Connection**

   Add your connection string to the `.env` file:

   ```env
   DATABASE_URL=your_database_connection_string
   ```

2. **Initialize Drizzle**

   ```bash
   npm run db init
   ```

3. **Run Migrations**

   ```bash
   npm run db migrate
   ```

4. **Generate Models**

   Example schema:

   ```js
   // src/db/schema/users.ts
   import { pgTable, text, boolean, sql } from 'drizzle-orm/pg';

   const users = pgTable('users', {
     id: text('id').primaryKey().default(sql`gen_random_uuid()`),
     firstName: text('first_name').notNull(),
     lastName: text('last_name').notNull(),
     email: text('email').notNull().unique(),
     emailVerified: boolean('email_verified').default(false),
     image: text('image'),
   });

   export type User = typeof users.$inferSelect;
   export default users;
   ```

   Add models to `src/db/schema/index.ts`:

   ```js
   export { default as users } from './users'
   ```

5. **Push Changes**

   ```bash
   npm run db push
   ```

6. **Seed Database**

   ```bash
   npm run db:seed
   ```

## UI Components

Leverage Shadcn for robust and accessible UI components.

## Email Notifications

Set up email notifications with Resend:

1. Visit [Resend](https://resend.com/) and get your API key.
2. Add the key to the `.env` file:

   ```env
   RESEND_API_KEY=your_api_key
   ```
