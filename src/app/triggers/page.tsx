"use client";
import { useState } from "react";

const placeholderTriggers = [
  { name: "Fair Value Gap", successCount: 25, failureCount: 11 },
  { name: "Inverse Fair Value Gap", successCount: 24, failureCount: 13 },
  { name: "SMT", successCount: 30, failureCount: 2 },
  { name: "Breaker", successCount: 15, failureCount: 5 },
  {
    name: "Accumulation Manipulation Distribution",
    successCount: 6,
    failureCount: 1,
  },
];

export default function TriggersPage() {
  const [triggers, setTriggers] = useState(placeholderTriggers);
  const [newTriggerName, setNewTriggerName] = useState("");

  const addTrigger = () => {
    if (newTriggerName.trim() !== "") {
      setTriggers([
        ...triggers,
        { name: newTriggerName, successCount: 0, failureCount: 0 },
      ]);
      setNewTriggerName("");
    }
  };

  const calculateWinRate = (success, failure) => {
    return failure === 0
      ? 100
      : ((success / (success + failure)) * 100).toFixed(2);
  };

  // Sort triggers by win rate (descending order)
  const sortedTriggers = triggers.sort((a, b) => {
    const winRateA = a.successCount / (a.successCount + a.failureCount);
    const winRateB = b.successCount / (b.successCount + b.failureCount);
    return winRateB - winRateA;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trading Triggers</h1>

      {/* Input to add a new trigger */}
      <div className="mb-4">
        <input
          type="text"
          value={newTriggerName}
          onChange={(e) => setNewTriggerName(e.target.value)}
          placeholder="Enter new trigger name"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={addTrigger}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Trigger
        </button>
      </div>

      {/* Trigger List */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">
              Trigger Name
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Success Count
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Failure Count
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Win Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTriggers.map((trigger, index) => (
            <tr key={index}>
              <td className="border border-gray-200 px-4 py-2">
                {trigger.name}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {trigger.successCount}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {trigger.failureCount}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {calculateWinRate(trigger.successCount, trigger.failureCount)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// const placeholderTriggers = [
//   { name: "Fair Value Gap", successCount: 25, failureCount: 11 },
//   { name: "Inverse Fair Value Gap", successCount: 24, failureCount: 13 },
//   { name: "SMT", successCount: 30, failureCount: 2 },
//   { name: "Breaker", successCount: 15, failureCount: 5 },
//   {
//     name: "Accumulation Manipulation Distribution",
//     successCount: 6,
//     failureCount: 1,
//   },
// ];

// export default function TriggersPage() {
//   return (
//     <div>Triggers Page</div>

//     // TODO: Basically a todo list.
//     // 1. Make an input to create a new trigger that just has an input for the name
//     // 2. Make a list of triggers
//     // 3. Next to each trigger there should be 3 comlumns: 1. successCount 2. failureCount 3. Win Rate successCount/failureCount.
//     // 4. The list should be sorted by win rate.
//   );
// }
