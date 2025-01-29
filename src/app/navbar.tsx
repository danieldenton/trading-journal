import React from "react";
import Link from "next/link";
import LogoutButton from "./dashboard/logout-button";

export default function Navbar() {
  return (
    <nav className="bg-white text-black font-bold py-4 px-8 flex justify-between items-center">
      <Link href="/dashboard">Home</Link>
      <Link href="/trades">Trades</Link>
      <Link href="/setups">Setups</Link>
      <Link href="/triggers">Triggers</Link>
      <Link href="/mistakes">Mistakes</Link>
      <LogoutButton />
    </nav>
  );
}
