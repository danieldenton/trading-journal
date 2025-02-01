"use client";
import React, { ChangeEvent } from "react";

import { useTriggerContext } from "../context/trigger";
import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";

export default function MiniTriggerTable({ forSetup }: { forSetup: boolean }) {
  const { triggers } = useTriggerContext();
  const { addOrRemoveTriggerFromTrade, trade } = useTradeContext();
  const { addOrRemoveTriggerFromSetup, setup } = useSetupContext();
  const state = forSetup ? setup : trade;

  const handleAddTrigger = (
    e: ChangeEvent<HTMLInputElement>,
    triggerId: number
  ) => {
    if (forSetup) {
      addOrRemoveTriggerFromSetup(e.target.checked, triggerId);
    } else {
      addOrRemoveTriggerFromTrade(e.target.checked, triggerId);
    }
  };

  const miniTriggerTable = triggers.map((trigger, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={state?.triggerIds.includes(trigger.id)}
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
