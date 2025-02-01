"use client";

import React, { useActionState } from "react";
import { useSetupContext } from "../context/setup";

export default function NewTriggerInput() {
  const { addNewSetup } = useSetupContext()
  const [state, newSetupAction, isPending] = useActionState(
    addNewSetup,
    undefined
  );

  return (
    <form action={newSetupAction} className="mb-4 flex flex-col justify-center items-center gap-2">
      <input
        type="text"
        name="name"
        placeholder="Enter new setup"
        className="p-2 rounded font-bold text-black placeholder-gray-500 text-center focus:outline-none"
      />

      <button
        disabled={isPending}
        type="submit"
        className="bg-red-500 text-white font-bold px-4 py-2 rounded "
      >
        Add Setup
      </button>
      {state ? <p className="text-red-500">{state}</p> : null}
    </form>
  );
}
