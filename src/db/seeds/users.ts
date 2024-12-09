import { users } from '../schema';
import { type db } from '@/db';
import bcrypt from 'bcrypt';

const seedUsers = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        emailVerified: new Date(),
        password: bcrypt.hashSync('password', 10),
        image: null,
    }
];

export default async function seed(db: db) {
    console.log('Seeding users...');
    for (const user of seedUsers) {
        await db
            .insert(users)
            .values(user)
            .onConflictDoNothing()
            .returning({ id: users.id });
    }
    console.log('Seeding users completed.');
}
