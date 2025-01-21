"use client";

import { useState } from "react";
import { useTriggerContext } from "@/context/trigger";

export default function NewTriggerInput() {
  const [newTriggerName, setNewTriggerName] = useState("");
  const { setTriggers } = useTriggerContext();

  // TODO: This should be a POST call to the server.
  const addTrigger = () => {
    if (newTriggerName.trim() !== "") {
      setTriggers((prev) => [
        ...prev,
        { name: newTriggerName, successCount: 0, failureCount: 0, winRate: 0 },
      ]);
      setNewTriggerName("");
    }
  };
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
