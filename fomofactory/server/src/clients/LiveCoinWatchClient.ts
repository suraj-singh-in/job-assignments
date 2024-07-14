import axios from "axios";

const liveCoinWatchClientConfig = {
  baseURL: "https://api.livecoinwatch.com/",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
    "x-api-key": process.env.LIVE_COIN_WATCH_API_KEY,
  },
};

const LiveCoinWatchClient = axios.create(liveCoinWatchClientConfig);

enum LiveCoinWatchApiUrls {
  coinsList = "coins/list",
}

export { LiveCoinWatchClient, LiveCoinWatchApiUrls };
