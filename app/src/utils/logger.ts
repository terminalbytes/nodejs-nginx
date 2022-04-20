import Pino from "pino";

export const logger: Pino.Logger = Pino({
    level: process.env.ROOT_LOG_LEVEL || "debug",
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
});