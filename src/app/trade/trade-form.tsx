"use client";
import React, { useActionState } from "react";
import { useTradeContext } from "../context/trade";
import MiniSetupTable from "./mini-setup-table";
import MiniTriggerTable from "../components/mini-trigger-table";
import EntryForm from "./entry-form";

export default function TradeForm() {
  const { triggerIds, setTriggerIds, postTrade } = useTradeContext();
  const [state, tradeAction, isPending] = useActionState(postTrade, undefined);
  return (
    <div>
      <h1>Trade Form</h1>
      <form
        action={tradeAction}
        className="flex flex-col items-center justify-center p-10 rounded-lg border-4 border-red-600"
      >
        <input
          type="text"
          name="symbol"
          placeholder="symbol"
          className="m-2 p-1 rounded-lg border-black border-2"
        />
        <EntryForm />

        <MiniSetupTable />
        <div className="flex flex-col justify-center items-center w-1/4 border-white border-2">
          <h1 className="font-bold p-2 text-xl">Triggers</h1>
          <MiniTriggerTable
            triggerState={triggerIds}
            setTriggerState={setTriggerIds}
          />
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="m-2 p-1 bg-red-600  font-bold text-white rounded-lg border-black border-2"
        >
          Post Trade
        </button>
      </form>
    </div>
  );
}
