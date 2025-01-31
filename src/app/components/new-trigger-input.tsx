"use client";

import React, { useActionState } from "react";
import { useTriggerContext } from "../context/trigger";

export default function NewTriggerInput() {
  const { addNewTrigger } = useTriggerContext();
  const [state, newTriggerAction, isPending] = useActionState(
    addNewTrigger,
    undefined
  );

  return (
    <form action={newTriggerAction} className="mb-4 flex flex-col justify-center items-center gap-2">
      <input
        type="text"
        name="name"
        placeholder="Enter new trigger"
        className="p-2 rounded font-bold text-black placeholder-gray-500 text-center focus:outline-none"
      />

      <button
        disabled={isPending}
        type="submit"
        className="bg-red-500 text-white font-bold px-4 py-2 rounded "
      >
        Add Trigger
      </button>
      {state ? <p className="text-red-500">{state}</p> : null}
    </form>
  );
}
