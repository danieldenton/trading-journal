"use client";

import { useState } from "react";
import { useMistakeContext } from "../context/mistake";
import { Mistake } from "../lib/types";
import DeleteModal from "./delete-modal";
import EditModal from "./edit-modal";

export default function MistakesTable() {
  const [modalType, setModalType] = useState<"delete" | "edit" | undefined>();
  const [selectedMistake, setSelectedMistake] = useState<Mistake | undefined>();
  const { mistakes } = useMistakeContext();

  const handleEdit = (mistake: Mistake) => {
    setModalType("edit");
    setSelectedMistake(mistake);
  };

  const handleDelete = (mistake: Mistake) => {
    setModalType("delete");
    setSelectedMistake(mistake);
  };

  const mistakeTable = mistakes.map((mistake, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 py-2 text-center font-bold">
          {mistake.name}
        </td>
        <td className="border border-gray-300 py-2 flex items-center justify-center gap-2">
          <button
            className="text-red-500 font-bold mx-1"
            onClick={() => handleEdit(mistake)}
          >
            Edit
          </button>
          <button
            className="text-red-500 font-bold mx-1"
            onClick={() => handleDelete(mistake)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {modalType === "delete" && selectedMistake ? (
        <DeleteModal mistake={selectedMistake} setModalType={setModalType} />
      ) : modalType === "edit" && selectedMistake ? (
        <EditModal mistake={selectedMistake} setModalType={setModalType} />
      ) : null}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 py-2 text-center">
              Mistake
            </th>
            <th className="border border-gray-300 py-2 w-15% text-center">
              Update
            </th>
          </tr>
        </thead>
        <tbody>{mistakeTable}</tbody>
      </table>
    </>
  );
}
