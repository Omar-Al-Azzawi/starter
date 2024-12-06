import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import env from '@/env';

import * as schema from './schema/index';

export const connection = postgres(env.DATABASE_URL, {
    max: env.DB_MIGRATING ? 1 : undefined,
});
const db = drizzle(connection, {
    schema,
});

export type db = typeof db;

export default db;
