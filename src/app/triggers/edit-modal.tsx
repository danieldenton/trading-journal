import React from "react";
import { TriggerModalProps } from "../lib/types";
import { useTriggerContext } from "../context/trigger";

export default function EditModal({
  trigger,
  setModalType,
}: TriggerModalProps) {

    const { updateTrigger, setTriggers } = useTriggerContext();

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    
    //     setTrigger((prev) => ({
    //       ...prev,
    //       [name]: value,
    //     }));
    //   };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[25%] w-[25%] flex items-center justify-center flex-col rounded shadow-lg">
        <p className="text-black font-bold text-lg px-2 text-center">
          Edit Trigger
        </p>
        <input
          type="text"
          name="name"
          value={trigger.name}
          onChange={(e) => (trigger.name = e.target.value)}
          className="p-2 rounded font-bold text-black placeholder-gray-500 w-[50%] text-center focus:outline-none"
        />
        <button
          onClick={() => setModalType(undefined)}
          className="bg-red-500 text-white font-bold px-11 py-2 m-1 rounded"
        >
          Save
        </button>
        <button
          onClick={() => setModalType(undefined)}
          className="bg-black text-white font-bold px-11 py-2 m-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
