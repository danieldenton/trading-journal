"use client";

import React, { ChangeEvent } from "react";


import { useTriggerContext } from "../context/trigger";

type MiniTriggerTableProps = {
  triggerState: number[];
  setTriggerState: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function MiniTriggerTable({
  triggerState,
  setTriggerState,
}: MiniTriggerTableProps) {
  const { triggers } = useTriggerContext();

  const handleAddTrigger = (triggerId: number) => {
    if (!triggerState.includes(triggerId)) {
      setTriggerState((prevState) => [...prevState, triggerId]);
    } else {
      setTriggerState((prevState) =>
        prevState.filter((id) => id !== triggerId)
      );
    }
  };

  const miniTriggerTable = triggers.map((trigger, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={triggerState.includes(trigger.id)}
            onChange={() => handleAddTrigger(trigger.id)}
          />
        </td>
        <td className="border border-gray-300 p-2 text-center font-bold">
          {trigger.name}
        </td>

        <td className="border border-gray-300 p-2 text-center  font-bold">
          {trigger.winRate}%
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table className="border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 p-2 text-center">Add</th>
            <th className="border border-gray-300 p-2 text-center">
              Trigger Name
            </th>
            <th className="border border-gray-300 p-2 text-center">Win Rate</th>
          </tr>
        </thead>
        <tbody>{miniTriggerTable}</tbody>
      </table>
    </div>
  );
}
