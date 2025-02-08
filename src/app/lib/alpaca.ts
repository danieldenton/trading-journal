import Alpaca from "@alpacahq/alpaca-trade-api";

const alpaca = new Alpaca({
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_SECRET,
})

const alpacaEndpoint = 'https://paper-api.alpaca.markets/v2';