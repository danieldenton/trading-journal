"use client";

import React, { useState } from "react";
import { useTradeContext } from "../context/trade";

export default function TakeProfit() {
  const [takeProfit, setTakeProfit] = useState<number | undefined>(undefined);
  const { setTakeProfits, takeProfits } = useTradeContext();

  const handleAddTakeProfitToTakeProfits = (tp: number) => {
    if (!isNaN(tp)) {
      setTakeProfits((prevState) => [...prevState, tp]);
      setTakeProfit(undefined);
    } else {
      console.error("Invalid take profit value");
    }
  };

  const takeProfiltList = takeProfits.map((tp, index) => {
    return (
      <div key={index}>
        <p>{tp}</p>
      </div>
    );
  });

  return (
    <>
      <div className="flex">
        <input
          type="number"
          className="m-2 p-1 rounded-lg text-black border-black border-2"
          onChange={(e) => setTakeProfit(Number(e.target.value))}
          value={takeProfit}
        />
        <button
          onClick={() => {
            if (takeProfit !== undefined) {
              handleAddTakeProfitToTakeProfits(takeProfit);
            }
          }}
          disabled={takeProfit === undefined}
          className="m-2 p-1 rounded-lg bg-red-600 text-white font-bold"
        >
          Add Take Profit
        </button>
      </div>
      {takeProfiltList}
    </>
  );
}
