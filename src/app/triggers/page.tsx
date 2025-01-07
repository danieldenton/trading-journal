"use client";
import { useState, useEffect } from "react";

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
  const [triggers, setTriggers] = useState([]);
  const [newTriggerName, setNewTriggerName] = useState("");

  useEffect(() => {
    setTriggers(placeholderTriggers);
  }, []);

  const addTrigger = () => {
    if (newTriggerName.trim() !== "") {
      setTriggers((prev) => [
        ...prev,
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

  const updateTriggerCount = (index, type, operation) => {
    setTriggers((prev) =>
      prev.map((trigger, i) => {
        if (i === index) {
          const updatedCount =
            operation === "increment"
              ? trigger[type] + 1
              : Math.max(trigger[type] - 1, 0);
          return { ...trigger, [type]: updatedCount };
        }
        return trigger;
      })
    );
  };

  const sortedTriggers = triggers
    .map((trigger, index) => ({ ...trigger, originalIndex: index }))
    .sort((a, b) => {
      const winRateA = a.successCount / (a.successCount + a.failureCount || 1);
      const winRateB = b.successCount / (b.successCount + b.failureCount || 1);
      return winRateB - winRateA;
    });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trading Triggers</h1>
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
          {sortedTriggers.map(({ originalIndex, ...trigger }) => (
            <tr key={originalIndex}>
              <td className="border border-gray-300 px-4 py-2">
                {trigger.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      updateTriggerCount(
                        originalIndex,
                        "successCount",
                        "decrement"
                      )
                    }
                    className="bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    -
                  </button>
                  {triggers[originalIndex].successCount}
                  <button
                    onClick={() =>
                      updateTriggerCount(
                        originalIndex,
                        "successCount",
                        "increment"
                      )
                    }
                    className="bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      updateTriggerCount(
                        originalIndex,
                        "failureCount",
                        "decrement"
                      )
                    }
                    className="bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    -
                  </button>
                  {triggers[originalIndex].failureCount}
                  <button
                    onClick={() =>
                      updateTriggerCount(
                        originalIndex,
                        "failureCount",
                        "increment"
                      )
                    }
                    className="bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {calculateWinRate(
                  triggers[originalIndex].successCount,
                  triggers[originalIndex].failureCount
                )}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
