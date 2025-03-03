"use client";

import React, { useActionState } from "react";
import { useRuleContext } from "../context/rule";

export default function NewRuleInput() {
  const { addNewRule } = useRuleContext();
  const [state, ruleAction, isPending] = useActionState(
    addNewRule,
    undefined
  );

  return (
    <form
      action={ruleAction}
      className="mb-4 flex flex-col justify-center items-center gap-2"
    >
      <input
        type="text"
        name="rule"
        placeholder="Enter new Rule"
        className="p-2 rounded font-bold text-black placeholder-gray-500 text-center focus:outline-none"
      />

      <button
        disabled={isPending}
        type="submit"
        className="bg-red-500 text-white font-bold px-4 py-2 rounded "
      >
        Add Rule
      </button>
      {state ? <p className="text-red-500">{state}</p> : null}
    </form>
  );
}
