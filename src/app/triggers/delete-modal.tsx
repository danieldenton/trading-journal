"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useTriggerContext } from "../context/trigger";
import { TriggerWithWinRate } from "../lib/types";

type DeleteModalProps = {
  trigger: TriggerWithWinRate;
  setModalType: Dispatch<SetStateAction<"delete" | "edit" | undefined>>;
};

export default function DeleteModal({
  trigger,
  setModalType,
}: DeleteModalProps) {
  const { deleteTriggerFromUser } = useTriggerContext();

  const handleDelteModal = () => {
    deleteTriggerFromUser(trigger.id);
    setModalType(undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[25%] w-[25%] flex items-center justify-center flex-col rounded shadow-lg">
        <p className="text-black font-bold text-lg px-2 text-center">
          Are you sure you want to delete
        </p>
        <p className="text-black font-bold text-lg px-2 mb-2 text-center">
          {trigger.name}?
        </p>
        <button
          onClick={() => handleDelteModal()}
          className="bg-red-500 text-white font-bold px-4 py-2 m-1 rounded"
        >
          Delete Trigger
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
