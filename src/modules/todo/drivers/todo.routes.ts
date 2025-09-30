import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import type { AppEnv } from "~/app";
import { resolver, validator } from "hono-openapi/zod";
import {
  allTodoDto,
  byIdTodoDto,
  createTodoDto,
  deleteTodoDto,
  updateTodoDto,
} from "./todo.dto";

import type { TodoUseCases } from "../domain/todo.use-cases";

export class TodoRoutes {
  public readonly router = new Hono<AppEnv>();

  constructor(private readonly useCases: TodoUseCases) {
    const OPENAPI_TAG = "Todos";

    this.router.get(
      "/",
      describeRoute({
        summary: "Get all todos",
        description: "Get all todos",
        tags: [OPENAPI_TAG],
        responses: {
          200: {
            description: "Todos fetched successfully",
            content: {
              "application/json": {
                schema: resolver(allTodoDto.response),
              },
            },
          },
        },
      }),
      async (c) => {
        const todos = await this.useCases.getAll();
        return c.json(todos);
      }
    );

    this.router.get(
      "/:id",
      describeRoute({
        summary: "Get todo by id",
        description: "Get todo by id",
        tags: [OPENAPI_TAG],
        responses: {
          200: {
            description: "Todo fetched successfully",
            content: {
              "application/json": {
                schema: resolver(byIdTodoDto.response),
              },
            },
          },
        },
      }),
      validator("param", byIdTodoDto.params),
      async (c) => {
        const todo = await this.useCases.getById(+c.req.param("id"));
        return c.json(todo);
      }
    );

    this.router.post(
      "/",
      describeRoute({
        summary: "Create todo",
        description: "Create todo",
        tags: [OPENAPI_TAG],
        responses: {
          200: {
            description: "Todo created successfully",
            content: {
              "application/json": {
                schema: resolver(createTodoDto.response),
              },
            },
          },
        },
      }),
      validator("json", createTodoDto.body),
      async (c) => {
        const todo = await this.useCases.create(c.req.valid("json"));
        return c.json(todo);
      }
    );

    this.router.put(
      "/:id",
      describeRoute({
        summary: "Update todo",
        description: "Update todo",
        tags: [OPENAPI_TAG],
        responses: {
          200: {
            description: "Todo updated successfully",
            content: {
              "application/json": {
                schema: resolver(updateTodoDto.response),
              },
            },
          },
        },
      }),
      validator("param", updateTodoDto.params),
      validator("json", updateTodoDto.body),
      async (c) => {
        const todo = await this.useCases.update(
          +c.req.param("id"),
          c.req.valid("json")
        );
        return c.json(todo);
      }
    );

    this.router.delete(
      "/:id",
      describeRoute({
        summary: "Delete todo",
        description: "Delete todo",
        tags: [OPENAPI_TAG],
        responses: {
          200: {
            description: "Todo deleted successfully",
            content: {
              "application/json": {
                schema: resolver(deleteTodoDto.response),
              },
            },
          },
        },
      }),
      validator("param", deleteTodoDto.params),
      async (c) => {
        await this.useCases.delete(+c.req.param("id"));
        return c.json({ id: +c.req.param("id") });
      }
    );
  }
}
