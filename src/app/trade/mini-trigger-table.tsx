"use client";
import React from "react";

import { useTriggerContext } from "../context/trigger";
import { useTradeContext } from "../context/trade";
import { Trade } from "../lib/types";

export default function MiniTriggerTable() {
  const { triggers } = useTriggerContext();
  const { setTrade, trade } = useTradeContext();

//   const handleAddTrigger = (triggerId: number) => {
//     if (trade?.triggerIds?.includes(triggerId)) {
//       setTrade((prevState: Trade) => {
//         return {
//           ...prevState,
//           triggerIds: [...prevState.triggerIds, triggerId],
//         };
//       });
//     } else {
//       setTrade((prevState: Trade) => {
//         return {
//           ...prevState,
//           triggerIds: prevState.triggerIds.filter((id) => id !== triggerId),
//         };
//       });
//     }
//   };

  const miniTriggerTable = triggers.map((trigger, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input
            type="checkbox"
            // checked={trade?.triggerIds.includes(trigger.id) ?? false}
            // onClick={() => {
            //   handleAddTrigger(trigger.id);
            // }}
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
