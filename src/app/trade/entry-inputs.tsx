"use client";

import React, { useState, ChangeEvent } from "react";

export default function EntryInputs() {
  const [longOrShort, setLongOrShort] = useState<"long" | "short" | undefined>(
    undefined
  );

  const handleLong = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLongOrShort("long");
    } 
  };

  const handleShort = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLongOrShort("short");
    }
  };

  return (
    <>
      <input
        type="text"
        name="symbol"
        placeholder="symbol"
        className="m-2 p-1 rounded-lg text-black border-black border-2"
      />
      <div className="flex flex-row justify-center items-center w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="long"
            onChange={(e) => handleLong(e)}
            checked={longOrShort === "long"}
            value={longOrShort === "long" ? "true" : "false"}
            className="m-2"
          />
          <label htmlFor="long">Long</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="short"
            onChange={(e) => handleShort(e)}
            checked={longOrShort === "short"}
            className="m-2"
          />
          <label htmlFor="short">Short</label>
        </div>
      </div>
      <input
        type="text"
        name="entryTime"
        placeholder="time"
        className="m-2 p-1 rounded-lg text-black border-black border-2"
      />
      <input
        type="number"
        name="entryPrice"
        placeholder="Entry Price"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />
      <input
        type="number"
        name="numberOfContracts"
        placeholder="Number of Contracts"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />
      <input
        type="number"
        name="stop"
        placeholder="Stop Price"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />
    </>
  );
}
