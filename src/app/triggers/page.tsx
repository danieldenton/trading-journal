"use client";

import { useState, useEffect } from "react";
import { Trigger } from "../lib/types";
import { placeholderTriggers } from "../lib/placeholders";
import NewTriggerInput from "../components/new-trigger-input";

export default function TriggersPage() {
  const [triggers, setTriggers] = useState<Trigger[]>([]);

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
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Triggers</h1>
      <NewTriggerInput />
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
