/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Transactions } from "@/components/transactions";
import {
  TransactionProps,
  createNewTransaction,
  fetchTransactions,
} from "@/lib/transaction";
import { UserProps, fetchUser } from "@/lib/user";
import { formatSilverEuro } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Account({ params }: { params: { id: string } }) {
  const [userAccount, setUserAccount] = useState<UserProps>();
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    loadUserAccount();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [userAccount]);

  async function loadUserAccount() {
    try {
      const accountDetail = await fetchUser(params.id);
      setUserAccount(accountDetail);
    } catch (e) {
      console.log("Error returning account", e);
    }
  }

  async function loadTransactions() {
    try {
      const transactionsResponse = await fetchTransactions(params.id, 10);
      setTransactions(transactionsResponse);
    } catch (e) {
      alert("Unable to return transactions");
    }
  }

  async function makeTransaction(data: FormData) {
    const email = data.get("input-email") as string;
    const amount = parseFloat(data.get("input-amount") as string);
    const available = userAccount?.balance;
    if (
      email?.length === 0 ||
      amount <= 0 ||
      !available ||
      amount > available
    ) {
      alert("Please enter correct transfer details");
      return;
    }
    try {
      await createNewTransaction(email, params.id, amount);
      window.location.reload();
    } catch (e) {
      alert("Transaction failed");
    }
  }

  function TransactionsLoading() {
    return <div>Loading...</div>;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {!userAccount && <h1>ACCOUNT LOADING</h1>}
      {userAccount && (
        <div>
          <h1>Welcome back, {userAccount.firstName}</h1>
          <div className="flex">
            <div className="flex flex-col items-center bg-white/30 m-6 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl w-full h-[26rem]">
              Account Balance:{" "}
              <strong>{formatSilverEuro(userAccount.balance || 0)}</strong>
              Recent transactions:
              <Suspense fallback={<TransactionsLoading />}>
                <Transactions transactions={transactions} />
              </Suspense>
            </div>

            <div className="flex flex-col items-center bg-white/30 m-6 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl w-full h-[26rem]">
              <strong>Make a transfer</strong>

              <form action={makeTransaction}>
                Recipient email <input name="input-email" type="text" />
                Amount $€ <input name="input-amount" type="number" step=".01" />
                <button>Make transfer</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
