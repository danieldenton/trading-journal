"use client";

import React, { useState, ChangeEvent } from "react";

export default function EntryInputs() {
  const [longOrShort, setLongOrShort] = useState<"long" | "short" | undefined>(
    undefined
  );

  const handleLong = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLongOrShort("long");
    } else {
      setLongOrShort(undefined);
    }
  };

  const handleShort = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLongOrShort("short");
    } else {
      setLongOrShort(undefined);
    }
  };

  return (
    <>
      <input
        type="text"
        name="symbol"
        placeholder="symbol"
        className="m-2 p-1 rounded-lg border-black border-2"
      />
      <div className="flex items-center">
        <input
          type="checkbox"
          name="long"
          onChange={(e) => handleLong(e)}
          checked={longOrShort === "long"}
          className="m-2"
        />
        <label htmlFor="longOrShort">Long</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="short"
          onChange={(e) => handleShort(e)}
          checked={longOrShort === "short"}
          className="m-2"
        />
        <label htmlFor="longOrShort">Short</label>
      </div>
      <input
        type="text"
        name="time"
        placeholder="time"
        className="m-2 p-1 rounded-lg border-black border-2"
      />
      <input
        type="number"
        name="price"
        placeholder="Entry Price"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />
      <input
        type="number"
        name="stop"
        placeholder="Stop Price"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />
      <input
        type="number"
        name="numOfContracts"
        placeholder="Number of Contracts"
        className="m-2 p-1 rounded-lg border-black border-2 focus:outline-none focus:ring-0 focus:border-black text-black"
      />
    </>
  );
}
