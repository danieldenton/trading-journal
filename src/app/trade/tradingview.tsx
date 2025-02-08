"use client";
import { useEffect, useRef, useState } from "react";

// { symbol, entryTime, exitTime }

export default function TradingViewChart() {
  const chartContainer = useRef<HTMLDivElement | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // If script is already loaded, don't load it again
    if (window.TradingView) {
      setScriptLoaded(true);
      return;
    }

    // Check if script is already in the document
    if (document.getElementById("tradingview-widget-script")) {
      setScriptLoaded(true);
      return;
    }

    // Create and append the script
    const script = document.createElement("script");
    script.id = "tradingview-widget-script";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true); // Mark script as loaded
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.TradingView || !chartContainer.current) return;

    const from = Math.floor(new Date("2024-02-04T14:30:00Z").getTime() / 1000);
    const to = Math.floor(new Date("2024-02-04T15:00:00Z").getTime() / 1000);

    new window.TradingView.widget({
      container_id: chartContainer.current.id,
      symbol: "NQ1!",
      interval: "1",
      range: "custom",
      from: from,
      to: to,
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      autosize: true,
    });
  }, [scriptLoaded]);
  //   }, [symbol, entryTime, exitTime]);

  return (
    <div
      ref={chartContainer}
      id="tradingview-chart"
      style={{ height: "500px" }}
    />
  );
}
