import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "./Response";

import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../constants/errorResponeMapping";

import logger from "../config/Logger";
import { ValidationRules } from "./typeDefinations";

const Validator = require("validatorjs");

/**
 * Joins any number of arguments into a single string separated by commas.
 * If an argument is an object, it will be converted to JSON string format.
 * @param {...any} args - Any number of arguments to be joined.
 * @returns {string} - A string joined by commas.
 */
export const loggerString = (...args: any[]): string => {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
    .join(": ");
};

/**
 * Express middleware for validating POST request data based on specified validation rules.
 * @function
 * @param {ValidationRules} rules - Validation rules to be applied to the request body.
 * @returns {RequestHandler} Express middleware function.
 * @throws Will throw an error if there is an issue during validation.
 */
export const postRequestValidator =
  (rules: ValidationRules): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      // validation
      const validation = new Validator(data, rules);

      // on pass move to next function
      validation.passes(() => {
        logger.info(loggerString("Request validation passed for", data));
        next();
      });

      // on fail return error response
      validation.fails(() => {
        logger.error(loggerString("Request validation failed", data));
        res
          .status(412)
          .send(new ErrorResponse(BAD_REQUEST_ERROR, validation.errors));
      });
    } catch (error) {
      console.log(error);

      logger.error(loggerString("Request validation failed", error));

      // on fail send generic error
      return res.status(412).send(new ErrorResponse(INTERNAL_SERVER_ERROR));
    }
  };

export const completeLogMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime();

  const { method, url, headers, body } = req;
  logger.info(loggerString("Incoming Request", { method, url, headers, body }));

  // Store the original send function
  const originalSend = res.send;

  // Replace the send function to log the response
  res.send = function (data) {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1e9 + nanoseconds) / 1e6; // in milliseconds

    logger.info(
      loggerString("Outgoing Response", {
        method,
        url,
        status: res.statusCode,
        responseTime: `${duration.toFixed(3)} ms`,
        responseBody: data,
      })
    );

    // Call the original send function
    return originalSend.call(this, data);
  };

  next();
};
