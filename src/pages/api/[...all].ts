import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
const env = process.env.NODE_ENV;
const target = env === "production" ? "" : "http://localhost:3000";

const proxy = createProxyMiddleware({
  target,
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
