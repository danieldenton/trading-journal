"use client";

import React from "react";
import { useTriggerContext } from "@/context/trigger";

export default function NewTriggerInput() {
  const { newTriggerName, setNewTriggerName, addTrigger } = useTriggerContext();

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        value={newTriggerName}
        onChange={(e) => setNewTriggerName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTrigger();
          }
        }}
        placeholder="Enter new trigger name"
        className="border p-2 rounded w-full font-bold text-gray-700 placeholder-gray-500"
      />

      <button
        onClick={addTrigger}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Trigger
      </button>
    </div>
  );
}
