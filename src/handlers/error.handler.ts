import { Request, Response, NextFunction } from "express";

// Catch-all error handler middleware
export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Unhandled error:", err);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}
