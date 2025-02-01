"use client";

import { useState } from "react";
import { useSetupContext } from "../context/setup";
import { SetupWithWinRate } from "../lib/types";

export default function SetupsTable() {
  const [modalType, setModalType] = useState<"delete" | "edit" | undefined>();
  const [selectedSetup, setSelectedSetup] = useState<
    SetupWithWinRate | undefined
  >();
  const { setups } = useSetupContext();

  const handleEdit = (setup: SetupWithWinRate) => {
    setModalType("edit");
    setSelectedSetup(setup);
  };

  const handleDelete = (setup: SetupWithWinRate) => {
    setModalType("delete");
    setSelectedSetup(setup);
  };

  const setupTable = setups.map((setup, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 py-2 text-center font-bold">
          {setup.name}
        </td>
        <td className="border border-gray-300 py-2 text-center font-bold">
          <div className="flex items-center justify-center gap-2">
            {setup.successCount}
          </div>
        </td>
        <td className="border border-gray-300 py-2 text-center font-bold"  >
          <div className="flex items-center justify-center gap-2">
            {setup.failureCount}
          </div>
        </td>
        <td className="border border-gray-300 py-2 text-center  font-bold">
          {setup.winRate}%
        </td>
        <td className="border border-gray-300 py-2 flex items-center justify-center gap-2">
          <button
            className="bg-white rounded text-black font-bold px-4"
            onClick={() => handleEdit(setup)}
          >
            Edit
          </button>
          <button
            className="bg-white rounded text-black font-bold px-2"
            onClick={() => handleDelete(setup)}
          >
            Delete
          </button>
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
            <th className="border border-gray-300 py-2 text-center">
              Setup Name
            </th>
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
        <tbody>{setupTable}</tbody>
      </table>
    </>
  );
}
