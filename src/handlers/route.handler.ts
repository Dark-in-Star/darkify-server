import { Request, Response } from "express";

// Catch-all 404 route handler middleware
export default function routeHandler(req: Request, res: Response): void {
  res.status(404).json({
    status: "fail",
    message: `Route ${req.originalUrl} not found`,
  });
}
