import Alpaca from "@alpacahq/alpaca-trade-api";

const alpaca = new Alpaca({
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_SECRET,
})

const alpacaEndpoint = 'https://paper-api.alpaca.markets/v2';

let options = {
    start: "2022-09-01",
    end: "2022-09-07",
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.DAY),
  };

export default function ReplayChart() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Replay Chart</h1>
    </div>
  );
}
