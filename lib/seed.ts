"use server";
import { sql } from "@vercel/postgres";

export async function seed() {
  console.log("Seed started");
  const createUserTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      surname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      balance FLOAT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log(`Created "users" table`);

  const createTransactionsTable = await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      narrative VARCHAR(255) NOT NULL,
      amount FLOAT,
      user_id INT,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `;

  console.log(`Created "transactions" table`);

  const users = await Promise.all([
    sql`
          INSERT INTO users (first_name, surname, email, password, balance)
          VALUES ('Guillermo', 'Rauch', 'rauchg@vercel.com', 'qwerty123', 321.21)
          ON CONFLICT (email) DO NOTHING;
      `,
    sql`
          INSERT INTO users (first_name, surname, email, password, balance)
          VALUES ('Lee', 'Robinson', 'lee@vercel.com',  'qwerty123', 987.55)
          ON CONFLICT (email) DO NOTHING;
      `,
    sql`
          INSERT INTO users (first_name, surname, email, password, balance)
          VALUES ('Steven', 'Tey', 'stey@vercel.com', 'qwerty123', 222.22)
          ON CONFLICT (email) DO NOTHING;
      `,
  ]);

  console.log(`Seeded ${users.length} users`);

  return {
    createUserTable,
    createTransactionsTable,
    users,
  };
}
