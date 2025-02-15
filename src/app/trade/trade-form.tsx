"use client";
import React, { useActionState } from "react";
import MiniSetupTable from "./mini-setup-table";
import MiniTriggerTable from "../components/mini-trigger-table";
import EntryForm from "./entry-form";

export default function TradeForm() {
  const [state, tradeAction, isPending] = useActionState(undefined, undefined);
  return (
    <div>
      <h1>Trade Form</h1>
      <form
        action={tradeAction}
        className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg border-4 border-red-600"
      >
        <input
          type="text"
          name="symbol"
          placeholder="symbol"
          className="m-2 p-1 rounded-lg border-black border-2"
        />

        <button
          disabled={isPending}
          type="submit"
          className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2"
        >
          Create Acount
        </button>
      </form>
    </div>
  );
}
