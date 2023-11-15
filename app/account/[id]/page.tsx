/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { UserProps, loadUser } from "@/lib/user";
import { useEffect, useState } from "react";

export default function Account({ params }: { params: { id: string } }) {
  const [userAccount, setUserAccount] = useState<UserProps>();

  useEffect(() => {
    loadUserAccount();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [userAccount]);

  async function loadUserAccount() {
    try {
      const accountDetail = await loadUser(params.id);
      setUserAccount(accountDetail);
      console.log(accountDetail);
    } catch (e) {
      console.log("Error returning account", e);
    }
  }

  async function loadTransactions() {}

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {!userAccount && <h1>ACCOUNT LOADING</h1>}
      {userAccount && (
        <div>
          <h1>Welcome back, {userAccount.firstName}</h1>
          <div className="flex justify-center bg-white/30 m-6 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full h-[26rem]">
            <h2>
              Account Balance: <strong>{userAccount.balance}</strong>
            </h2>
          </div>
        </div>
      )}
    </main>
  );
}
