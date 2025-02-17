"use client";

import { useState } from "react";
import { useTriggerContext } from "../context/trigger";
import { Trigge } from "../lib/types";
import DeleteModal from "./delete-modal";
import EditModal from "./edit-modal";

export default function TriggersTable() {
  const [modalType, setModalType] = useState<"delete" | "edit" | undefined>();
  const [selectedTrigger, setSelectedTrigger] = useState<
    Trigge | undefined
  >();
  const { triggers } = useTriggerContext();

  const handleEdit = (trigger: Trigge) => {
    setModalType("edit");
    setSelectedTrigger(trigger);
  };

  const handleDelete = (trigger: Trigge) => {
    setModalType("delete");
    setSelectedTrigger(trigger);
  };

  const triggerTable = triggers.map((trigger, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 py-2 text-center font-bold">
          {trigger.name}
        </td>
        <td className="border border-gray-300 py-2 text-center font-bold">
          <div className="flex items-center justify-center gap-2">
            {trigger.successCount}
          </div>
        </td>
        <td className="border border-gray-300 py-2 text-center font-bold">
          <div className="flex items-center justify-center gap-2">
            {trigger.failureCount}
          </div>
        </td>
        <td className="border border-gray-300 py-2 text-center  font-bold">
          {trigger.winRate}%
        </td>
        <td className="border border-gray-300 py-2 flex items-center justify-center gap-2">
          <button
            className="text-red-500 font-bold mx-1"
            onClick={() => handleEdit(trigger)}
          >
            Edit
          </button>
          <button
            className="text-red-500 font-bold mx-1"
            onClick={() => handleDelete(trigger)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {modalType === "delete" && selectedTrigger ? (
        <DeleteModal trigger={selectedTrigger} setModalType={setModalType} />
      ) : modalType === "edit" && selectedTrigger ? (
        <EditModal trigger={selectedTrigger} setModalType={setModalType} />
      ) : null}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 py-2 text-center">Trigger</th>
            <th className="border border-gray-300 py-2 text-center">
              Success Count
            </th>
            <th className="border border-gray-300 py-2 text-center">
              Failure Count
            </th>
            <th className="border border-gray-300 py-2 text-center">
              Win Rate
            </th>
            <th className="border border-gray-300 py-2 w-15% text-center">
              Update
            </th>
          </tr>
        </thead>
        <tbody>{triggerTable}</tbody>
      </table>
    </>
  );
}
