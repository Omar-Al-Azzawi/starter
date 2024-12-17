import db, { type db as dbType, connection } from '@/db'
import * as seeds from './seeds'
import * as schema from '@/db/schema'
import { getTableName, sql, Table } from 'drizzle-orm'
import env from '@/env'

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds')
}

async function resetTable(db: dbType, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`))
}

for (const table of [schema.users]) {
  await resetTable(db, table)
}

await seeds.users(db)

await connection.end()
