import React, { useState } from "react";
import { SetupModalProps } from "../lib/types";
import { useSetupContext } from "../context/setup";
import MiniTriggerTable from "../components/mini-trigger-table";

export default function EditModal({ setup, setModalType }: SetupModalProps) {
  const [newSetupName, setNewSetupName] = useState(setup.name);
  const { patchAndSaveUpdatedSetupToSetups } = useSetupContext();

  const updatedSetup = {
    id: setup.id,
    name: newSetupName,
    triggerIds: setup.triggerIds,
    successCount: setup.successCount,
    failureCount: setup.failureCount,
    winRate: setup.winRate,
  };

  const handleCompleteEdit = () => {
    patchAndSaveUpdatedSetupToSetups(updatedSetup);
    setModalType(undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white flex items-center justify-center flex-col rounded shadow-lg">
        <p className="text-black font-bold text-lg px-2 text-center mb-1">
          Edit setup Name
        </p>
        <input
          type="text"
          name="name"
          value={newSetupName}
          onChange={(e) => setNewSetupName(e.target.value)}
          className="p-2 rounded font-bold text-black placeholder-gray-500 w-[50%] text-center focus:outline-none border border-black mb-1"
        />
        <MiniTriggerTable setup={setup} />
        <button
          onClick={() => handleCompleteEdit()}
          className="bg-red-500 text-white font-bold px-12 py-2 m-1 rounded"
        >
          Save
        </button>
        <button
          onClick={() => setModalType(undefined)}
          className="bg-black text-white font-bold px-10 py-2 m-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
