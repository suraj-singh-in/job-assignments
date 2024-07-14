export type ErrorResponseType = {
  statusCode?: number;
  errorCode: string;
  errorMessage: string;
};

export type successResponseType = {
  statusCode?: string | number;
  message?: string;
  data?: any;
};

export type ErrorMap = {
  [key: string]: ErrorResponseType;
};

export type ValidationRules = {
  [key: string]: string;
};

export type validationRulesMap = {
  [key: string]: ValidationRules;
};
