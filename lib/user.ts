"use server";

import { QueryResultRow, sql } from "@vercel/postgres";
import { logTransaction } from "./transaction";

export interface UserProps {
  firstName: string;
  surname: string;
  email: string;
  password?: string;
  balance?: number;
}

export async function createUser(props: UserProps): Promise<string> {
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

  try {
    const response = await sql`
      INSERT INTO users (first_name, surname, email, password, balance)
      VALUES (${props.firstName}, ${props.surname}, ${props.email}, ${props.password}, ${balance})
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;

    const id: string = response.rows[0].id;
    if (balance > 0) {
      const narrative = "Promotional signup bonus";
      const amount = parseInt(promotionalBalance as string);
      logTransaction({ id, narrative, amount });
    }
    return id;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function logInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> {
  const response =
    await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password};`;

  if (response.rows.length === 0) {
    return Promise.reject();
  }

  const userAccount = response.rows[0];
  return userAccount.id;
}

export async function fetchUser(id: string) {
  const response = await sql`SELECT * FROM users WHERE id = ${id};`;
  console.log(response.rows[0]);
  if (response.rows.length === 0) {
    return Promise.reject();
  }

  const userAccount = response.rows[0];
  return {
    firstName: userAccount.first_name,
    surname: userAccount.surname,
    email: userAccount.email,
    balance: userAccount.balance,
  };
}

function validateUserProps(props: UserProps): boolean {
  if (!props.firstName || props.firstName.length === 0) {
    return false;
  }

  if (!props.surname || props.surname.length === 0) {
    return false;
  }

  if (!props.email || props.email.length === 0) {
    return false;
  }

  if (!props.password || props.password.length === 0) {
    return false;
  }

  return true;
}
