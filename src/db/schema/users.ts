import { text, pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    image: text("image"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    createdAt: timestamp('created_at', { mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
        .notNull()
        .defaultNow(),
});

export type User = typeof users.$inferSelect;
export default users;
