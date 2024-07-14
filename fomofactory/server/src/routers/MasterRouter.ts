import { NextFunction, Request, Response, Router } from "express";

import { MasterRouterRouteMap } from "../config/constants";

import HealthRouter from "./HealthRouter";
import CoinRouter from "./CoinRouter";

class MasterRouter {
  public _router = Router();
  private healthRouter = HealthRouter;
  private coinRouter = CoinRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use(MasterRouterRouteMap.CONFIG_ROUTE, this.healthRouter);
    this._router.use(MasterRouterRouteMap.COIN_ROUTE, this.coinRouter);
  }
}

export = new MasterRouter().router;
