import { cors } from "hono/cors";

export const corsConfig = cors({
  origin: [process.env.FRONTEND_URL!, process.env.URL!],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS", "PUT", "PATCH", "DELETE"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});
