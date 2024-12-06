import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .notNull()
        .defaultNow(),
});

export type User = typeof users.$inferSelect;
export default users;
