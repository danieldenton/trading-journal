import React from "react";
import Link from "next/link";
import UserName from "./user-name";

export default function DashboardPage() {
  return (
    <div className="p-6 w-full h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <UserName />
      <div className="flex justify-center">
        <Link
          href={"/today"}
          className="bg-red-700 p-4 m-4 font-bold hover:text-yellow-200 hover:bg-red-800 rounded"
        >
          Begin a new trading day
        </Link>
      </div>
      <p>total trades logged</p>
      <p>total days traded</p>
      <p>win rate</p>
      <p>total P&L</p>
    </div>
  );
}
