"use client";

import React, { useState } from "react";
import { useTradeContext } from "../context/trade";

export default function TakeProfit() {
  const [takeProfit, setTakeProfit] = useState<number | undefined>(undefined);
  const { setTakeProfits } = useTradeContext();

  const handleAddTakeProfitToTakeProfits = (tp: number) => {
    if (!isNaN(tp)) {
      setTakeProfits((prevState) => [...prevState, tp]);
      setTakeProfit(undefined);
    } else {
      console.error("Invalid take profit value");
    }
  };

  return (
    <div>
      <input
        type="number"
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
      >
        Add Take Profit
      </button>
    </div>
  );
}
