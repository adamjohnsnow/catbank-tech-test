"use client";
import { Transactions } from "@/components/transactions";
import { TransactionProps, fetchAllTransactions } from "@/lib/transaction";
import { UserProps, fetchAllUsers } from "@/lib/user";
import { formatSilverEuro } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Admin() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    loadUsers();
    loadTransactions();
  }, []);

  async function loadUsers() {
    try {
      const usersResponse = await fetchAllUsers();
      setUsers(usersResponse);
    } catch (e) {
      alert("Unable to return transactions");
    }
  }

  async function loadTransactions() {
    try {
      const transactionsResponse = await fetchAllTransactions();
      setTransactions(transactionsResponse);
    } catch (e) {
      alert("Unable to return transactions");
    }
  }
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      ADMIN
      <div className="flex flex-col items-center bg-white/30 m-6 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full h-[26rem]">
        <strong>All Users</strong>
        <div>
          {users.map((user) => {
            return (
              <div key={user.email}>
                {user.email} - {formatSilverEuro(user.balance as number)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center bg-white/30 m-6 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full h-[26rem]">
        <strong>All transactions</strong>
        <Transactions transactions={transactions} />
      </div>
    </main>
  );
}
