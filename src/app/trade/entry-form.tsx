"use client";

import React from "react";

export default function EntryForm() {
  <form>
    <input type="checkbox" name="longOrShort" checked={false} className="" />
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
  </form>;
}
