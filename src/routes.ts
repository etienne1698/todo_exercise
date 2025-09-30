import { app } from "./app";
import { appTodoRoutes } from "./composition-root";

app.route("/todos", appTodoRoutes.router);
