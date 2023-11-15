"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  const [displaySignUp, setDisplaySignUp] = useState<Boolean>(false);
  const [displayLogIn, setDisplayLogIn] = useState<Boolean>(false);

  function showLogIn() {
    setDisplayLogIn(true);
  }

  function showSignUp() {
    setDisplaySignUp(true);
  }

  function goBack() {
    setDisplaySignUp(false);
    setDisplayLogIn(false);
  }
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Welcome to Catbank
      </h1>
      <Image
        className="m-4"
        alt="silver cat logo"
        src="/silver_cat.svg"
        width={60}
        height={60}
      ></Image>
      <div className="flex justify-center bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full h-[16rem]">
        {displaySignUp && (
          <div className="flex">
            <form>
              <input
                name="inout_firstname"
                type="text"
                placeholder="First name"
              ></input>
              <input
                name="inout_surname"
                type="text"
                placeholder="Surname"
              ></input>
            </form>
            <a onClick={goBack}>Back</a>
          </div>
        )}
        {displayLogIn && (
          <div className="flex">
            <form>
              <input
                name="input_email"
                type="text"
                placeholder="Enter email"
              ></input>
              <input
                name="input_password"
                type="password"
                placeholder="Enter password"
              ></input>
            </form>
            <a onClick={goBack}>Back</a>
          </div>
        )}

        {!displaySignUp && !displayLogIn && (
          <div className="flex flex-col items-center">
            <div>What would you like to do first?</div>

            <div>
              <button onClick={showLogIn}>Log In</button>
            </div>
            <div>
              <button onClick={showSignUp}>Sign Up</button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
        <Link
          href="/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Contact us
        </Link>
        <Link
          href="/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Privacy policy
        </Link>
        <Link
          href="/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Ts&Cs
        </Link>
      </div>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between"></div>
    </main>
  );
}
