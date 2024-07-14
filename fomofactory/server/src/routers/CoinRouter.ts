import { Router } from "express";

import { coinsRouteEndpoints } from "../config/constants";
import { getCoinDetails } from "../services/CoinService";

class CoinRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(coinsRouteEndpoints.COINS_LIST, getCoinDetails);
  }
}

export = new CoinRouter().router;
