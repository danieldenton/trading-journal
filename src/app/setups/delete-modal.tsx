"use client";

import React from "react";
import { useSetupContext } from "../context/setup";
import { SetupModalProps } from "../lib/types";

export default function DeleteModal({
  setup,
  setModalType,
}: SetupModalProps) {
  const { deleteSetupFromUser } = useSetupContext()

  const handleDelete = () => {
    deleteSetupFromUser(setup.id);
    setModalType(undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[25%] w-[25%] flex items-center justify-center flex-col rounded shadow-lg">
        <p className="text-black font-bold text-lg px-2 text-center">
          Are you sure you want to delete
        </p>
        <p className="text-black font-bold text-lg px-2 mb-2 text-center">
          {setup.name}?
        </p>
        <button
          onClick={() => handleDelete()}
          className="bg-red-500 text-white font-bold px-3 py-2 m-1 rounded"
        >
          Delete Trigger
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
