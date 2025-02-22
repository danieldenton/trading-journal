"use client";

import React, { useState } from "react";
import { useTradeContext } from "../context/trade";

export default function TakeProfit() {
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setTakeProfits, takeProfits } = useTradeContext();

  const handleAddTakeProfitToTakeProfits = (tpString: string) => {
    const tp = Number(tpString);
    if (!isNaN(tp) && tp > 0) {
      setTakeProfits((prevState) => [...prevState, tp]);
      setTakeProfit("");
      setError("");
    } else {
      setError("Invalid take profit value");
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
          type="text"
          className="m-2 p-1 rounded-lg text-black border-black border-2"
          onChange={(e) => setTakeProfit(e.target.value)}
          value={takeProfit}
        />
        <button
          type="button"
          onClick={() => {
            handleAddTakeProfitToTakeProfits(takeProfit);
          }}
          className="m-2 p-1 rounded-lg bg-red-600 text-white font-bold"
        >
          Add Take Profit
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </div>
      {takeProfiltList}
    </>
  );
}
