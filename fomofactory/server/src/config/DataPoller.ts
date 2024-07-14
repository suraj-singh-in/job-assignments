import cron from "node-cron";
import {
  LiveCoinWatchApiUrls,
  LiveCoinWatchClient,
} from "../clients/LiveCoinWatchClient";
import { CoinDocument } from "../schema/Coin";
import logger from "./Logger";
import { loggerString } from "../utils/helperMethods";
import { updateCoin } from "../services/CoinService";

class DataPoller {
  private static instance: DataPoller;
  private job: cron.ScheduledTask;

  public constructor() {
    DataPoller.instance = this;
    DataPoller.instance.job = cron.schedule("10 * * * * *", async () => {
      try {
        const payload = {
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 5,
          meta: true,
        };

        const response = await LiveCoinWatchClient.post<CoinDocument[]>(
          LiveCoinWatchApiUrls.coinsList,
          payload
        );

        const data = response.data;

        logger.info(loggerString("LiveCoinWatchClient Response : ", data));

        if (data && Array.isArray(data)) {
          data.forEach((coinDetails: CoinDocument) => {
            try {
              updateCoin(coinDetails);
            } catch (error) {
              logger.error(loggerString("Error while updating  data", error));
            }
          });
        }
      } catch (error) {
        logger.info(loggerString("LiveCoinWatchClient error : ", error));
      }
    });
  }

  // Getter method to access the DataPoller instance
  public static getInstance(): DataPoller {
    if (!DataPoller.instance) {
      new DataPoller();
    }

    // Return the DataPoller instance
    return DataPoller.instance;
  }

  public getJob(): cron.ScheduledTask {
    return DataPoller.getInstance().job;
  }
}

// Create a Singleton instance of the DataPoller class
const dataPollerInstance = new DataPoller();

// Export the Mongoose connection to be used throughout the application
export default dataPollerInstance;
