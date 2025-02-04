// create inputs for triggers and mistakes
// Create checkboxes forn existing triggers and mistakes

import React from "react";
import TradePageTriggers from "./trade-page-triggers";
import TradePageSetups from "./trade-page-setups";

export default function TradePage() {
  return (
    <div className="p-6 w-full h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Trade</h1>
      <div className="flex justify-around">
        <TradePageSetups />
        <TradePageTriggers />
      </div>
    </div>
  );
}
