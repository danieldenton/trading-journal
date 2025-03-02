"use client";

import React from "react";
import Link from "next/link";
import LogoutButton from "./logout-button";
import { useUserContext } from "../context/user";

export default function Navbar() {
  const { user } = useUserContext();
  return (
    <nav className="bg-white text-black font-bold py-4 px-8 flex justify-between items-center">
      {user?.id ? (
        <>
          <Link href="/dashboard">Home</Link>
          <Link href="/today">Today</Link>
          <Link href="/trades">Trades</Link>
          <Link href="/setups">Setups</Link>
          <Link href="/triggers">Triggers</Link>
          <Link href="/mistakes">Mistakes</Link>
          <Link href="/rules">Rules</Link>
          <LogoutButton />
        </>
      ) : (
        <h2 className="w-full text-center">WELCOME TO TRADING JOURNAL JOURNAL</h2>
      )}
    </nav>
  );
}
