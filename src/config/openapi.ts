import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { swaggerUI } from "@hono/swagger-ui";

import "zod-openapi/extend";
import type { Env, Hono } from "hono";

const OPENAPI_URL = "/openapi.json";

export function openapiConfig<T extends Env>(app: Hono<T>) {
  app.get(
    OPENAPI_URL,
    openAPISpecs(app, {
      documentation: {
        info: {
          title: "Todos API",
          version: "1.0.0",
          description: "Todos API",
        },
        servers: [{ url: process.env.URL!, description: "Server" }],
      },
    })
  );

  app.get("/openapi/swagger-ui", swaggerUI({ url: OPENAPI_URL }));

  app.get(
    "/openapi/scalar-ui",
    apiReference({
      theme: "saturn",
      spec: { url: OPENAPI_URL },
    })
  );
}
