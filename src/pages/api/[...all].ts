import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";

const proxy = createProxyMiddleware({
  target: "http://localhost:3000",
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
