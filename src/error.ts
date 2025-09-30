import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { ValidationError } from "./shared/domain/errors";

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  if (err instanceof ValidationError) {
    return c.json(
      {
        error: {
          issues: [
            {
              code: "validation_error",
              message: err.message,
              path: err.fields,
            },
          ],
          name: "ValidationError",
        },
      },
      400
    );
  }
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});
