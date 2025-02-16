"use client";
import React from "react";

import { useTriggerContext } from "../context/trigger";
import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";
import { Setup } from "../lib/types";

export default function MiniTriggerTable({
  setup,
}: {
  setup: Setup | undefined;
}) {
  const { triggers } = useTriggerContext();
  const { setTriggerIds, triggerIds } = useTradeContext();
  const { addOrRemoveTriggerFromSetup, selectedTriggerIds } = useSetupContext();

  const addOrRemoveTriggerFromTrade = (triggerId: number) => {
      if (!triggerIds.includes(triggerId)) {
        setTriggerIds((prevState) => [...prevState, triggerId]);
      } else {
        setTriggerIds((prevState) =>
          prevState.filter((id) => id !== triggerId)
        );
      }
    };

  const handleAddTrigger = (triggerId: number) => {
    if (setup) {
      addOrRemoveTriggerFromSetup(triggerId);
    } else {
      addOrRemoveTriggerFromTrade(triggerId);
    }
  };

  const miniTriggerTable = triggers.map((trigger, index) => {
    const checked = setup
      ? selectedTriggerIds.includes(trigger.id)
      : triggerIds.includes(trigger.id);
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={checked}
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
