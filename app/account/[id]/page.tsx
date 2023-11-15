/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Transactions } from "@/components/transactions";
import { TransactionProps, fetchTransactions } from "@/lib/transaction";
import { UserProps, fetchUser } from "@/lib/user";
import { formatSilverEuro } from "@/lib/utils";
import { useEffect, useState } from "react";

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
      const transactionsResponse = await fetchTransactions(params.id);
      setTransactions(transactionsResponse);
    } catch (e) {
      alert("Unable to return transactions");
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {!userAccount && <h1>ACCOUNT LOADING</h1>}
      {userAccount && (
        <div>
          <h1>Welcome back, {userAccount.firstName}</h1>
          <div className="flex flex-col items-center bg-white/30 m-6 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full h-[26rem]">
            <h2>
              Account Balance:{" "}
              <strong>{formatSilverEuro(userAccount.balance || 0)}</strong>
            </h2>
            <h3>Recent transactions:</h3>
            <Transactions transactions={transactions} />
          </div>
        </div>
      )}
    </main>
  );
}
