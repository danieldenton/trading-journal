"use client";

import { useTriggerContext } from "@/context/trigger";
import NewTriggerInput from "../components/new-trigger-input";

export default function TriggersPage() {
const { triggers } = useTriggerContext();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Triggers</h1>
      <NewTriggerInput />
      {/* put this trigger table in it's own component */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Trigger Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Success Count
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Failure Count
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Win Rate (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {triggers.map((trigger, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {trigger.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  {trigger.successCount}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  {trigger.failureCount}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {trigger.winRate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* end trigger table component here */}
    </div>
  );
}
