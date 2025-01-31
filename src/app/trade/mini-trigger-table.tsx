"use client";
import React from "react";

import { useTriggerContext } from "../context/trigger";

export default function MiniTriggerTable() {
  const { triggers } = useTriggerContext();

  const miniTriggerTable = triggers.map((trigger, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 p-2 text-center">
          <input type="checkbox" />
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
            <th className="border border-gray-300 py-2 text-center">
              Add
            </th>
            <th className="border border-gray-300 py-2 text-center">
              Trigger Name
            </th>
            <th className="border border-gray-300 py-2 text-center">
              Win Rate
            </th>
           
          </tr>
        </thead>
        <tbody>{miniTriggerTable}</tbody>
      </table>
    </div>
  );
}
