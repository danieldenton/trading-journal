import React, { useState } from "react";
import { TriggerModalProps } from "../lib/types";
import { useTriggerContext } from "../context/trigger";

export default function EditModal({
  trigger,
  setModalType,
}: TriggerModalProps) {
  const [newTriggerName, setNewTriggerName] = useState(trigger.name);
  const { patchAndSaveUpdatedTriggerToTriggers } = useTriggerContext();

  const updatedTigger = {
    ...trigger,
    name: newTriggerName,
  };

  const handleCompleteEdit = () => {
    patchAndSaveUpdatedTriggerToTriggers(updatedTigger);
    setModalType(undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[25%] w-[25%] flex items-center justify-center flex-col rounded shadow-lg">
        <p className="text-black font-bold text-lg px-2 text-center mb-1">
          Edit Trigger
        </p>
        <input
          type="text"
          name="name"
          value={newTriggerName}
          onChange={(e) => setNewTriggerName(e.target.value)}
          className="p-2 rounded font-bold text-black placeholder-gray-500 w-[50%] text-center focus:outline-none border border-black mb-1"
        />
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
