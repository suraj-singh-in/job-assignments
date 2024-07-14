import { ErrorResponseType, successResponseType } from "./typeDefinations";

class ErrorResponse {
  private statusCode: number;
  private errorCode: string;
  private errorMessage: string;
  private data: any;

  constructor(
    { statusCode, errorCode, errorMessage }: ErrorResponseType,
    data?: any
  ) {
    this.statusCode = statusCode ? statusCode : 500;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.data = data;
  }
}

class SuccessResponse {
  private statusCode: string | number;
  private data: any;
  private message: string;

  constructor({ statusCode, data, message }: successResponseType) {
    this.statusCode = statusCode ? statusCode : "FOMO-FACTORY-000";
    this.data = data;
    this.message = message;
  }
}

export { ErrorResponse, SuccessResponse };
