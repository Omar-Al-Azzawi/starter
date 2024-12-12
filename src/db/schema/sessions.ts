import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import users from "./users";

const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp('expiresAt').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('createdAt').notNull(),
    updatedAt: timestamp('updatedAt').notNull(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    userId: text('userId').notNull().references(() => users.id)
});

export default sessions;