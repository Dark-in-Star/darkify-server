import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import api from "./main";
import logger from "./utils/logger";
import errorHandlers from "./handlers/error.handler";
import routeHandlers  from "./handlers/route.handler";


export const server = express();

server.use(
  cookieSession({
    name: "test-auth",
    keys: [
      process.env.COOKIE_SESSION_KEY1!,
      process.env.COOKIE_SESSION_KEY2!,
    ],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

server.use(cookieParser(process.env.COOKIE_SECRET_KEY));
server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());
server.use(express.urlencoded({ extended: true, parameterLimit: 1000000 }));
server.use(compression());

server.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

server.use(helmet());

server.use(
  morgan(
    "[:date[web]] :method :url :status :response-time ms - :res[content-length]",
    {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }
  )
);

// API and static
server.use("/", api);

// Catch-all & error handling
server.use(routeHandlers);
server.use(errorHandlers);

export default server;
