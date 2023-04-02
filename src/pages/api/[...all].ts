import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
import { baseURL } from "@/const";

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
