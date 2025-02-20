"use client";
import React, { ChangeEvent } from "react";

import { useTriggerContext } from "../context/trigger";
import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";
import { Setup, SetupWithWinRate } from "../lib/types";

export default function MiniTriggerTable({
  setup,
}: {
  setup: Setup | SetupWithWinRate | undefined;
}) {
  const { triggers } = useTriggerContext();
  const { addOrRemoveTriggerFromTrade, trade } = useTradeContext();
  const { addOrRemoveTriggerFromSetup, selectedTriggerIds } = useSetupContext();

  const handleAddTrigger = (
    e: ChangeEvent<HTMLInputElement>,
    triggerId: number
  ) => {
    if (setup) {
      addOrRemoveTriggerFromSetup(e.target.checked, triggerId);
    } else {
      addOrRemoveTriggerFromTrade(e.target.checked, triggerId);
    }
  };

  const miniTriggerTable = triggers.map((trigger, index) => {
    const checked = setup
      ? selectedTriggerIds.includes(trigger.id)
      : trade.triggerIds.includes(trigger.id);
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => handleAddTrigger(e, trigger.id)}
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
