"use client";
import React from "react";

import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";

export default function MiniSetupTable() {
  const { setups } = useSetupContext();
  const { setSetupIds, setupIds } = useTradeContext();

  const handleAddSetup = (setupId: number) => {
    if (!setupIds.includes(setupId)) {
      setSetupIds((prevState) => {
        return [...prevState, setupId];
      });
    } else {
      setSetupIds((prevState) => {
        return prevState.filter((id) => id !== setupId);
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
            onChange={() => handleAddSetup(setup.id)}
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
