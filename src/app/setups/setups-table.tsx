"use client";

import { useState, useEffect } from "react";
import { useSetupContext } from "../context/setup";
import { useTriggerContext } from "../context/trigger";
import { SetupWithWinRate } from "../lib/types";

export default function SetupsTable() {
  const [modalType, setModalType] = useState<"delete" | "edit" | undefined>();
  const [selectedSetup, setSelectedSetup] = useState<
    SetupWithWinRate | undefined
  >();
  const { setups } = useSetupContext();
  const { triggers } = useTriggerContext();

  const handleEdit = (setup: SetupWithWinRate) => {
    setModalType("edit");
    setSelectedSetup(setup);
  };

  const handleDelete = (setup: SetupWithWinRate) => {
    setModalType("delete");
    setSelectedSetup(setup);
  };

  const setupTable = setups.map((setup, index) => {
    const triggerNames = setup.triggerIds.map(
      (triggerId) => triggers.find((trigger) => trigger.id === triggerId)?.name
    );
    return (
      <tr key={index}>
        <td className="border border-gray-300 py-2 text-center font-bold">
          {setup.name}
        </td>
        <td className="flex flex-col border border-gray-300 py-2 text-center font-bold">
          {setup.triggerIds.map((triggerId, index) => (
            <span key={index}>
              {triggers.find((trigger) => trigger.id === triggerId)?.name}
            </span>
          ))}
        </td>
        <td className="border border-gray-300 py-2 text-center font-bold">
          {setup.failureCount + setup.successCount}
        </td>
        <td className="border border-gray-300 py-2 text-center  font-bold">
          {setup.winRate}%
        </td>
        <td className="border border-gray-300 py-2 text-center">
          <div className="flex justify-center items-center gap-2">
            <button
              className=" text-red-500 font-bold mx-1"
              onClick={() => handleEdit(setup)}
            >
              Edit
            </button>
            <button
              className="text-red-500 font-bold mx-1"
              onClick={() => handleDelete(setup)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      {/* {modalType === "delete" && selectedsetup ? (
        <DeleteModal setup={selectedsetup} setModalType={setModalType} />
      ) : modalType === "edit" && selectedsetup ? (
        <EditModal setup={selectedsetup} setModalType={setModalType} />
      ) : null} */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 py-2 text-center">Setup</th>
            <th className="border border-gray-300 py-2 text-center">
              Triggers
            </th>
            <th className="border border-gray-300 py-2 text-center">
              Total Count
            </th>
            <th className="border border-gray-300 py-2 text-center">
              Win Rate
            </th>
            <th className="border border-gray-300 py-2 w-15% text-center">
              Update
            </th>
          </tr>
        </thead>
        <tbody>{setupTable}</tbody>
      </table>
    </>
  );
}
