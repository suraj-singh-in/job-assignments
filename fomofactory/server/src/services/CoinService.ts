import { NextFunction, Request, Response, Router } from "express";

import CoinModel, { CoinDocument } from "../schema/Coin";

import { ErrorResponse, SuccessResponse } from "../utils/Response";

// Utils
import logger from "../config/Logger";
import { loggerString } from "../utils/helperMethods";

import { INTERNAL_SERVER_ERROR } from "../constants/errorResponeMapping";

export const updateCoin = async (coinDetails: CoinDocument) => {
  try {
    logger.info(loggerString("Coin Data", coinDetails.code));

    const coinDetailsData = new CoinModel(coinDetails);

    coinDetailsData.save().then((result) => {
      logger.info(loggerString("Coin Data Added", result.code, result._id));
    });
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While updating coin data", error));

    return new ErrorResponse(INTERNAL_SERVER_ERROR);
  }
};

export const getCoinDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get code from query
    const { code } = req.query as { code?: string };

    // if code is not present throw error
    if (!code) {
      return res.status(500).json(
        new ErrorResponse({
          statusCode: 500,
          errorCode: "FOMO-FACTORY-ERROR-0001",
          errorMessage: "Code is required",
        })
      );
    }

    // fetch data from database
    const data = await CoinModel.find({ code })
      .sort({ createdAt: -1 })
      .limit(20);

    return res
      .status(200)
      .json(new SuccessResponse({ data, message: "Data fetched Succesfully" }));
  } catch (error) {
    logger.error(loggerString("Error while fetching coin details", error));

    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};
