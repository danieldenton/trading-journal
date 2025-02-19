"use client";

import React from "react";

import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";
import { Setup } from "../lib/types";

export default function MiniSetupTable() {
  const { setups } = useSetupContext();
  const { setSetupIds, setupIds, setTriggerIds, triggerIds } =
    useTradeContext();

  const handleAddSetup = (setup: Setup) => {
    if (!setupIds.includes(setup.id)) {
      setSetupIds((prevState) => {
        return [...prevState, setup.id];
      });
      setup.triggerIds.forEach((triggerId) => {
        if (!triggerIds.includes(triggerId)) {
          setTriggerIds((prevState) => [...prevState, triggerId]);
        }
      });
    } else {
      setSetupIds((prevState) => {
        return prevState.filter((id) => id !== setup.id);
      });
    }
  };

  const miniSetupTable = setups.map((setup, index) => {
    if (setup.id === undefined) return null;
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            checked={setupIds.includes(setup.id)}
            onChange={() => handleAddSetup(setup)}
          />
        </td>
        <td className="border border-gray-300 p-2 text-center font-bold">
          {setup.name}
        </td>
        <td className="border border-gray-300 p-2 text-center  font-bold">
          {setup.winRate}%
        </td>
      </tr>
    );
  });

  return (
    <div className="flex flex-col justify-center items-center w-1/4 border-white border-2">
      <h1 className="font-bold p-2 text-xl">Setups</h1>

      <div>
        <table className="border border-gray-300 mb-4">
          <thead>
            <tr className="bg-white text-black">
              <th className="border border-gray-300 p-2 text-center">Add</th>
              <th className="border border-gray-300 p-2 text-center">Setup</th>
              <th className="border border-gray-300 p-2 text-center">
                Win Rate
              </th>
            </tr>
          </thead>
          <tbody>{miniSetupTable}</tbody>
        </table>
      </div>
    </div>
  );
}
