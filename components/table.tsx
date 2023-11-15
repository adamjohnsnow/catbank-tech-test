import { sql } from "@vercel/postgres";
import { seed } from "@/lib/seed";

export default async function seedTables() {
  let data;
  try {
    data = await sql`SELECT * FROM users`;
  } catch (e: any) {
    if (e.message.includes('relation "users" does not exist')) {
      console.log(
        "User table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seed();
    } else {
      throw e;
    }
  }

  return;
}
