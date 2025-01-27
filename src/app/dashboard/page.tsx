import React from "react";
import Link from "next/link";
import LogoutButton from "./logout-button";
import UserName from "./user-name";

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard Page</h1>
      <UserName />
      {/* 
      // total trades 
      // total days traded 
      // win rate 
      // total P&L 
      // */}
      <Link href="/triggers">Triggers</Link>
      <LogoutButton />
    </>
  );
}
