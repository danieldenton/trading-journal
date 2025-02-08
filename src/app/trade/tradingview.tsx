"use client";
import { useEffect, useRef } from "react";

// { symbol, entryTime, exitTime }

export default function TradingViewChart() {
  const chartContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainer.current) return;

    // Convert trade times to UNIX timestamps (seconds)
    const from = Math.floor(new Date("2024-02-04T14:30:00Z").getTime() / 1000);
    const to = Math.floor(new Date("2024-02-04T15:00:00Z").getTime() / 1000);

    new window.TradingView.widget({
      container_id: chartContainer.current.id,
      symbol: "MNQH5",
      interval: "1", // 1-minute chart
      range: "custom",
      from: from,
      to: to,
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1", // Candlestick chart
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      autosize: true,
    });
  }, []);
  //   }, [symbol, entryTime, exitTime]);

  return (
    <div
      ref={chartContainer}
      id="tradingview-chart"
      style={{ height: "500px" }}
    />
  );
}
