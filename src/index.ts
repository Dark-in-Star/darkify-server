import "dotenv/config";
import http from "http";
import {server} from "./server";
import logger from "./utils/logger";

const port = process.env.PORT || 5000;
server.set("port", port);

const httpServer = http.createServer(server);

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err: unknown) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = httpServer.address();

  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Server listening at ${bind} in ${process.env.ENV} mode`);
}

httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);
