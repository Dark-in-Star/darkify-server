import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import passport from "passport";
import { fileURLToPath } from "url";
import api from "./main";
import logger from "./utils/logger";
import errorHandlers from "./handlers/error.handler";
import routeHandlers  from "./handlers/route.handler";

// Get __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(
  cookieSession({
    name: "test-auth",
    keys: [
      process.env.COOKIE_SESSION_KEY1!,
      process.env.COOKIE_SESSION_KEY2!,
    ],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 1000000 }));
app.use(compression());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(helmet());

app.use(
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
app.use("/api", api);
app.use(express.static(path.join(__dirname, "../public")));

// Catch-all & error handling
app.use(routeHandlers);
app.use(errorHandlers);

export default app;
