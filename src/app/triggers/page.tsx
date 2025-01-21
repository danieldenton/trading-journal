"use client";

import { useState, useEffect } from "react";
import { Trigger } from "../lib/types";
import { placeholderTriggers } from "../lib/placeholders";

export default function TriggersPage() {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [newTriggerName, setNewTriggerName] = useState("");

  // Calculates win rate.
  function calculateWinRate(
    successCount: number,
    failureCount: number
  ): number {
    const total = successCount + failureCount;
    return total > 0 ? Math.round((successCount / total) * 100) : 0;
  }

  // Gets existing triggers and adds winRate key/value.
  // TODO: This should be a GET call to the server.
  useEffect(() => {
    const triggersWithWinRate = placeholderTriggers
      .map((trigger) => ({
        ...trigger,
        winRate: calculateWinRate(trigger.successCount, trigger.failureCount),
      }))
      .sort((a, b) => b.winRate - a.winRate);
    setTriggers(triggersWithWinRate);
  }, []);

  // Adds triggers.
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trading Triggers</h1>
      {/* convert this to a form in it's own component */}
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
      {/* end new trigger form here */}
      {/* put this trigger table in it's own component */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Trigger Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Success Count
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Failure Count
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Win Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {triggers.map((trigger, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {trigger.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  {trigger.successCount}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  {trigger.failureCount}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {trigger.winRate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* end trigger table component here */}
    </div>
  );
}
