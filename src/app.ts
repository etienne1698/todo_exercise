import { corsConfig } from "./config/cors";
import { Hono } from "hono";
import { openapiConfig } from "./config/openapi";

export type AppEnv = {
  Variables: {};
};

export const app = new Hono<AppEnv>();

app.use(
  "*",
  corsConfig
);

openapiConfig(app);