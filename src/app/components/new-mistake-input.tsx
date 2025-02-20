"use client";

import React, { useActionState } from "react";
import { useMistakeContext } from "../context/mistake";

export default function NewMistakeInput() {
  const { addNewMistake } = useMistakeContext();
  const [state, newMistakeName, isPending] = useActionState(
    addNewMistake,
    undefined
  );

  return (
    <form
      action={newMistakeName}
      className="mb-4 flex flex-col justify-center items-center gap-2"
    >
      <input
        type="text"
        name="name"
        placeholder="Enter new mistake name"
        className="p-2 rounded font-bold text-black placeholder-gray-500 text-center focus:outline-none"
      />

      <button
        disabled={isPending}
        type="submit"
        className="bg-red-500 text-white font-bold px-4 py-2 rounded "
      >
        Add Mistake
      </button>
      {state ? <p className="text-red-500">{state}</p> : null}
    </form>
  );
}
