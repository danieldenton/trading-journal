import React, { useState } from "react";
import { SetupModalProps } from "../lib/types";
import { useSetupContext } from "../context/setup";
import MiniTriggerTable from "../components/mini-trigger-table";

export default function EditModal({ setup, setModalType }: SetupModalProps) {
  const [newSetupName, setNewSetupName] = useState(setup.name);
  const {
    patchAndSaveUpdatedSetupToSetups,
    selectedTriggerIds,
    setSelectedTriggerIds,
  } = useSetupContext();

  const updatedSetup = {
    id: setup.id,
    name: newSetupName,
    triggerIds: selectedTriggerIds,
    successCount: setup.successCount,
    failureCount: setup.failureCount,
    winRate: setup.winRate,
  };

  const handleCompleteEdit = () => {
    patchAndSaveUpdatedSetupToSetups(updatedSetup);
    setModalType(undefined);
    setSelectedTriggerIds([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black flex items-center justify-center flex-col shadow-lg border-white border-2 rounded">
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
        <MiniTriggerTable
          triggerState={selectedTriggerIds}
          setTriggerState={setSelectedTriggerIds}
        />
        <button
          onClick={() => handleCompleteEdit()}
          className="bg-red-500 text-white font-bold px-12 py-2 m-1 rounded gap-2"
        >
          Save
        </button>
        <button
          onClick={() => setModalType(undefined)}
          className="bg-white text-black font-bold px-10 py-2 m-1 rounded gap-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
