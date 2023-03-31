import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
const env = process.env.NODE_ENV;
const target = env === "production" ? "http://127.0.0.1:3003" : "http://127.0.0.1:3003";

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
