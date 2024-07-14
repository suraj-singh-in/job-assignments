import { NextFunction, Request, Response, Router } from "express";
import logger from "../config/Logger";
import { SuccessResponse } from "../utils/Response";
import mongoConnectionInstance from "../config/DBConfig";

class HealthController {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(
      "/health",
      async (req: Request, res: Response, next: NextFunction) => {
        logger.info("Health Checked");

        // Check database connection
        const dbConnected = await mongoConnectionInstance.isConnected();

        // Check DB stats
        const serverStatus = await mongoConnectionInstance.getServerStatus();

        return res.status(200).json(
          new SuccessResponse({
            message: "OK 200",
            data: {
              serviceUptime: process.uptime(),
              databaseInforamtion: {
                dbConnected,
                uptime: serverStatus.uptimeMillis / 1000,
              },
            },
          })
        );
      }
    );
  }
}

export = new HealthController().router;
