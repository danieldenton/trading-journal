import React from "react";
import Link from "next/link";
import UserName from "./user-name";

export default function DashboardPage() {
  return (
    <div className="p-6 w-full h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <UserName />

      <Link href={"/today"} className="bg-red-700 p-4 m-4 font-bold hover:text-yellow-200">Begin a new trading day</Link>
      {/* 
      // total trades 
      // total days traded 
      // win rate 
      // total P&L 
      // */}
    </div>
  );
}
