import {Request} from "express";

export const getBaseUrl = (req: Request) => {
  const protocol = req.protocol;
  const host = req.get("host"); 
  return `${protocol}://${host}`;
}