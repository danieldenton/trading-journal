import React from "react";
import { RuleModalProps } from "../lib/types";
import { useRuleContext } from "../context/rule";

export default function DeleteModal({
  rule,
  setModalType,
}: RuleModalProps) {

  const { deleteRuleFromDb } = useRuleContext();

  const handleDelete = () => {
    deleteRuleFromDb(rule.id);
    setModalType(undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[25%] w-[25%] flex items-center justify-center flex-col rounded shadow-lg p-4">
        <p className="text-black font-bold text-lg px-2 text-center mb-3">
          Are you sure you want to delete "{rule.rule}"?
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white font-bold px-8 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => setModalType(undefined)}
            className="bg-black text-white font-bold px-8 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
