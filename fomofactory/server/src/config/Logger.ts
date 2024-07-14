import { createLogger, format, transports, config } from "winston";
import rTracer from "cls-rtracer";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
  format.splat(),
  format.colorize(),
  format.printf((info) => {
    let rid = rTracer.id();
    return rid
      ? `[${info.timestamp} ${info.level}: [request-id: ${rid}] : ${info.message}`
      : `[${info.timestamp} ${info.level}] : ${info.message}`;
  })
);

const logger = createLogger({
  levels: config.syslog.levels,
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL || "info",
      format: logFormat,
    }),
  ],
});

export = logger;
