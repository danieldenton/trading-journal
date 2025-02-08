import DateTime from "./date-time";
import LinkButton from "../components/link-button";
import TradingViewChart from "./tradingview";

export default function TodayPage() {
  return (
    <div className="p-6 w-full h-screen">
       <h1 className="text-2xl font-bold mb-4 text-center">Today</h1>
      <DateTime />
      <TradingViewChart />
      <div className="flex justify-center">
        <LinkButton href="/trade" text="journal a trade" />
      </div>
    </div>
  );
}
