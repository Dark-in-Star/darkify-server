import express from "express";
import cors from "cors";
import api from "./main";

export const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors());

// API route
server.use("/", api);

export default server;