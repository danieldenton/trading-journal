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

    const from = new Date().getDate();
    const to = new Date().getDate() - 60;

    new window.TradingView.widget({
      container_id: chartContainer.current.id,
      "autosize": true,
          "symbol": "MNQ1!",
          "timezone": "America/New_York",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "hide_top_toolbar": true,
          "range": "D",
          "allow_symbol_change": true,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
    });
  }, [scriptLoaded]);
  //   }, [symbol, entryTime, exitTime]);

  return (
    <div
    className="h-96 w-96"
      ref={chartContainer}
      id="tradingview-chart"
    />
  );
}
