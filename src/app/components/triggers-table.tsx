"use client";

import React from "react";
import { useTriggerContext } from "../context/trigger";

export default function TriggersTable() {
  const { triggers, deleteTriggerFromUser } = useTriggerContext();

  const triggerTable = triggers.map((trigger, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 py-2 text-center">
          {trigger.name}
        </td>
        <td className="border border-gray-300 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            {trigger.successCount}
          </div>
        </td>
        <td className="border border-gray-300 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            {trigger.failureCount}
          </div>
        </td>
        <td className="border border-gray-300 py-2 text-center">
          {trigger.winRate}%
        </td>
        <td className="border border-gray-300 py-2 flex items-center justify-center gap-2">
          <button
            className="bg-gray-300 rounded text-black px-4"
            onClick={() => deleteTriggerFromUser(trigger.name)}
          >
            Edit
          </button>
          <button
            className="bg-gray-300 rounded text-black px-2"
            onClick={() => deleteTriggerFromUser(trigger.name)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-white text-black">
          <th className="border border-gray-300 py-2 text-center">
            Trigger Name
          </th>
          <th className="border border-gray-300 py-2 text-center">
            Success Count
          </th>
          <th className="border border-gray-300 py-2 text-center">
            Failure Count
          </th>
          <th className="border border-gray-300 py-2 text-center">Win Rate</th>
          <th className="border border-gray-300 py-2 w-15% text-center">Update</th>
        </tr>
      </thead>
      <tbody>{triggerTable}</tbody>
    </table>
  );
}
