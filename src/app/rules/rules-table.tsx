"use client";

import { useState } from "react";
import { useRuleContext } from "../context/rule";
import { Rule } from "../lib/types";
import DeleteModal from "./delete-modal";
import EditModal from "./edit-modal";

export default function RulesTable() {
  const [modalType, setModalType] = useState<"delete" | "edit" | undefined>();
  const [selectedRule, setSelectedRule] = useState<Rule | undefined>();
  const { rules } = useRuleContext();

  const handleEdit = (Rule: Rule) => {
    setModalType("edit");
    setSelectedRule(Rule);
  };

  const handleDelete = (Rule: Rule) => {
    setModalType("delete");
    setSelectedRule(Rule);
  };

  const ruleTable = rules.map((rule, index) => {
    return (
      <tr key={index}>
        <td className="border border-gray-300 py-2 text-center font-bold">
          {rule.name}
        </td>
        <td className="border border-gray-300 py-2 flex items-center justify-center gap-2">
          <button
            className="text-red-500 font-bold mx-1"
            onClick={() => handleEdit(rule)}
          >
            Edit
          </button>
          <button
            className="text-red-500 font-bold mx-1"
            onClick={() => handleDelete(rule)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {modalType === "delete" && selectedRule ? (
        <DeleteModal rule={selectedRule} setModalType={setModalType} />
      ) : modalType === "edit" && selectedRule ? (
        <EditModal rule={selectedRule} setModalType={setModalType} />
      ) : null}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white text-black">
            <th className="border border-gray-300 py-2 text-center">
              Rule
            </th>
            <th className="border border-gray-300 py-2 w-15% text-center">
              Update
            </th>
          </tr>
        </thead>
        <tbody>{ruleTable}</tbody>
      </table>
    </>
  );
}
