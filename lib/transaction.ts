"use server";

import { sql } from "@vercel/postgres";
import { adjustUserBalance, fetchUserId } from "./user";

export interface TransactionProps {
  id: string;
  amount: number;
  narrative: string;
}

export async function createNewTransaction(
  recipientEmail: string,
  senderId: string,
  amount: number
): Promise<boolean> {
  try {
    const recipientId = await fetchUserId(recipientEmail);

    await logTransaction({
      id: senderId,
      amount: -amount,
      narrative: `Transferred to user: ${recipientEmail}`,
    });

    await adjustUserBalance(senderId, -amount);

    await logTransaction({
      id: recipientId,
      amount: amount,
      narrative: `Transferred from user id: ${senderId}`,
    });

    await adjustUserBalance(recipientId, amount);

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function logTransaction(props: TransactionProps) {
  await sql`
    INSERT INTO transactions (user_id, narrative, amount)
    VALUES (${props.id}, ${props.narrative}, ${props.amount})
  `;
}

export async function fetchTransactions(
  userId: string,
  limit: number
): Promise<any[]> {
  try {
    const response =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} LIMIT ${limit}`;
    console.log(response);
    return response.rows;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function fetchAllTransactions(): Promise<any[]> {
  try {
    const response = await sql`SELECT * FROM transactions`;
    return response.rows;
  } catch (e) {
    return Promise.reject(e);
  }
}
