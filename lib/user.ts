"use server";

import { sql } from "@vercel/postgres";

interface UserProps {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}

export async function createUser(props: UserProps) {
  let balance: number = 0;

  const dateString = process.env.PROMOTION_END_DATE;
  const promotionalBalance = process.env.PROMOTION_VALUE;

  if (dateString && promotionalBalance) {
    const parsedDate = new Date(dateString);
    const today = new Date();
    if (parsedDate >= today) {
      balance = parseFloat(promotionalBalance);
    }
  }

  const response = await sql`
  INSERT INTO users (first_name, surname, email, password, balance)
  VALUES (${props.firstName}, ${props.surname}, ${props.email}, ${props.password}, ${balance})
  ON CONFLICT (email) DO NOTHING
  RETURNING id;
`;
  return response.rows[0].id;
}
