"use client";
import React, { ChangeEvent } from "react";

import { useSetupContext } from "../context/setup";
import { useTradeContext } from "../context/trade";
import { Trade } from "../lib/types";

export default function MiniSetupTable() {
  const { setups } = useSetupContext();
  const { setTrade, trade } = useTradeContext();

  const handleAddSetup = (
    e: ChangeEvent<HTMLInputElement>,
    setupId: number
  ) => {
    if (e.target.checked) {
      setTrade((prevState: Trade) => {
        return {
          ...prevState,
          setupIds: [...prevState.setupIds, setupId],
        };
      });
    } else {
      setTrade((prevState: Trade) => {
        return {
          ...prevState,
          setupIds: prevState.triggerIds.filter((id) => id !== setupId),
        };
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
            checked={trade?.setupIds.includes(setup.id)}
            onChange={(e) => handleAddSetup(e, setup.id)}
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
    <div>
      <table className="border border-gray-300 mb-4">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 p-2 text-center">Add</th>
            <th className="border border-gray-300 p-2 text-center">Setup</th>
            <th className="border border-gray-300 p-2 text-center">Win Rate</th>
          </tr>
        </thead>
        <tbody>{miniSetupTable}</tbody>
      </table>
    </div>
  );
}
