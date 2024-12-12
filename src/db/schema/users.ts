import { text, pgTable, timestamp, boolean } from "drizzle-orm/pg-core";

const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('emailVerified').notNull(),
    image: text('image'),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull()
});

export type User = typeof users.$inferSelect;
export default users;
