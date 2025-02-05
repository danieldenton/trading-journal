"use client";

import React from "react";
import { useMistakeContext } from "../context/mistake";

export default function NewMistakeInput() {
  const { newMistakeName, setNewMistakeName, addMistake } = useMistakeContext();

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        value={newMistakeName}
        onChange={(e) => setNewMistakeName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addMistake();
          }
        }}
        placeholder="Enter new mistake name"
        classname="border p-2 rounded w-full font-bold text-gray-700 placeholder-gray-500"
      />

      <button
        onClick={addMistake}
        classname="bg-blue-500 text-white px-4,py-2 rounded"
      >
        Add Mistake
      </button>
    </div>
  );
}
