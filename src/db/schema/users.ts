import { sql } from 'drizzle-orm'
import { text, pgTable, timestamp, boolean } from 'drizzle-orm/pg-core'

const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export default users
