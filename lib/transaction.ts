"use server";

import { sql } from "@vercel/postgres";

export interface TransactionProps {
  id: string;
  amount: number;
  narrative: string;
}

export async function logTransaction(props: TransactionProps) {
  sql`
    INSERT INTO transactions (user_id, narrative, amount)
    VALUES (${props.id}, ${props.narrative}, ${props.amount})
  `;
}

export async function fetchTransactions(userId: string): Promise<any[]> {
  try {
    const response =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} LIMIT 10`;
    return response.rows;
  } catch (e) {
    return Promise.reject(e);
  }
}
