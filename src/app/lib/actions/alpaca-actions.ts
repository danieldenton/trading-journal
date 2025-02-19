import Alpaca from "@alpacahq/alpaca-trade-api";

// Set up Alpaca with your API keys
const alpaca = new Alpaca({
  keyId: process.env.ALPACA_API_KEY,
  secretKey: process.env.ALPACA_SECRET,
});

export async function fetchAlpacaData() {
  const options = {
    start: "2022-09-01",
    end: "2022-09-07",
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.DAY), 
  };

  try {
    const bars = await alpaca.getCryptoBars(["BTC/USD"], options);
    return bars; 
  } catch (error) {
    console.error("Error fetching Alpaca data:", error);
    throw new Error("Failed to fetch data from Alpaca.");
  }
}