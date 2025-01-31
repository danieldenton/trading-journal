import React from "react";
import LinkButton from "../components/link-button";
import UserName from "./user-name";

export default function DashboardPage() {
  return (
    <div className="p-6 w-full h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <UserName />
      <div className="flex justify-center">
        <LinkButton href="/today" text="Begin a new trading day" />
      </div>
      <p>total trades logged</p>
      <p>total days traded</p>
      <p>win rate</p>
      <p>total P&L</p>
    </div>
  );
}
