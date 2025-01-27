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
    <div>
      <form action={newTriggerAction} className="mb-4 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Enter new trigger"
          className="border p-2 rounded w-full font-bold text-gray-700 placeholder-gray-500"
        />

        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Trigger
        </button>
        {state ? <p className="text-red-500">{state}</p> : null}
      </form>
    </div>
  );
}
