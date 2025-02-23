import React from "react";

export default function ExitInputs() {
  return (
    <>
      <input
        type="number"
        name="exitPrice"
        placeholder="Exit Price"
        className="m-2 p-1 rounded-lg text-black border-black border-2"
      />
      <input
        type="text"
        name="exitTime"
        placeholder="Exit Time"
        className="m-2 p-1 rounded-lg text-black border-black border-2"
      />
      <input
        type="number"
        name="pnl"
        placeholder="PNL"
        className="m-2 p-1 rounded-lg text-black border-black border-2"
      />
    </>
  );
}
