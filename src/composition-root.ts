import { TodoRepositorySql } from "./modules/todo/infrastructure/todo.repository-sql";
import { TodoUseCases } from "./modules/todo/domain/todo.use-cases";
import { TodoRoutes } from "./modules/todo/drivers/todo.routes";

export const appTodoRepository = new TodoRepositorySql();
export const appTodoUseCases = new TodoUseCases(appTodoRepository);
export const appTodoRoutes = new TodoRoutes(appTodoUseCases);
