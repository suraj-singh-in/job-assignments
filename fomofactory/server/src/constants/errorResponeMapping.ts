import { ErrorMap, ErrorResponseType } from "../utils/typeDefinations";

/**
 * Represents an internal server error response.
 * @type {ErrorResponseType}
 * @property {number} statusCode - The HTTP status code for internal server error (500).
 * @property {string} errorCode - The error code associated with the internal server error.
 * @property {string} errorMessage - A descriptive error message for internal server error.
 */
export const INTERNAL_SERVER_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "FOMO-FACTORY-ERROR-0001",
  errorMessage: "Something went wrong, please try again after some time",
};

/**
 * Represents a bad request error response.
 * @type {ErrorResponseType}
 * @property {number} statusCode - The HTTP status code for bad request (500).
 * @property {string} errorCode - The error code associated with the bad request error.
 * @property {string} errorMessage - A descriptive error message for bad request.
 */
export const BAD_REQUEST_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "FOMO-FACTORY-ERROR-0002",
  errorMessage: "Bad Request",
};

export const UNAUTHORIZED: ErrorResponseType = {
  statusCode: 401,
  errorCode: "FOMO-FACTORY-ERROR-0003",
  errorMessage: "You are not authorized to access this resource.",
};

/**
 * Function to generate a generic error with a custom error message.
 * @param {string} errorMessage - The custom error message describing the issue.
 * @returns {ErrorResponseType} A generic error response.
 */
export const genericError = (errorMessage: string): ErrorResponseType => {
  return {
    statusCode: 500,
    errorCode: "FOMO-FACTORY-ERROR-0005",
    errorMessage: errorMessage,
  };
};
