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
    <div>
      <p>Are you sure you want to delete {trigger.name}?</p>
      <button
        onClick={() => handleDelteModal()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete Trigger
      </button>
      <button onClick={() => setModalType(undefined)}>Cancel</button>
    </div>
  );
}
