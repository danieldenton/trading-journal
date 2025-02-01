"use client";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { useTriggerContext } from "../context/trigger";
import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";
import { Trade, Setup } from "../lib/types";

type Props = {
  forSetup: boolean;
};

export default function MiniTriggerTable({ forSetup }: { forSetup: boolean }) {
  const { triggers } = useTriggerContext();
  const { setTrade, trade } = useTradeContext();
  const { setSetup, setup } = useSetupContext();
  const state = forSetup ? setup : trade;

  const handleAddTrigger = (
    e: ChangeEvent<HTMLInputElement>,
    triggerId: number
  ) => {
    if (forSetup) {
      if (e.target.checked) {
        setSetup((prevState) => {
          return {
            ...prevState,
            triggerIds: [...prevState.triggerIds, triggerId],
          };
        });
      } else {
        setSetup((prevState) => {
          return {
            ...prevState,
            triggerIds: prevState.triggerIds.filter((id) => id !== triggerId),
          };
        });
      }
    } else {
      if (e.target.checked) {
        setTrade((prevState) => {
          return {
            ...prevState,
            triggerIds: [...prevState.triggerIds, triggerId],
          };
        });
      } else {
        setTrade((prevState) => {
          return {
            ...prevState,
            triggerIds: prevState.triggerIds.filter((id) => id !== triggerId),
          };
        });
      }
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
