import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
const env = process.env.NODE_ENV;
const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://101.200.130.1:3003"
    : "http://localhost:3003";

const proxy = createProxyMiddleware({
  target: baseURL,
  secure: false,
  pathRewrite: { "^/api": "" },
});

export default function handler(req: Request, res: Response) {
  return proxy(req, res, (err) => {
    if (err) {
      throw err;
    }
  });
}
