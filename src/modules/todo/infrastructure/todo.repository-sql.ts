import { db } from "~/shared/infrastructure/database";
import type { TodoRepository } from "../domain/todo.repository";
import { TodoEntity, type TodoEntityProps } from "../domain/todo.entity";

export class TodoRepositorySql implements TodoRepository {
  async findAll(): Promise<TodoEntity[]> {
    const result = db.prepare("SELECT * FROM todos").all();
    return result.map((todo) => new TodoEntity(todo as TodoEntityProps));
  }

  async findById(id: TodoEntity["id"]): Promise<TodoEntity> {
    const result = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
    return new TodoEntity(result as TodoEntityProps);
  }

  async create(todo: Omit<TodoEntityProps, "id">): Promise<TodoEntity["id"]> {
    const result = db
      .prepare(
        "INSERT INTO todos (title, description, dueDate) VALUES (?, ?, ?)"
      )
      .run(todo.title, todo.description, todo.dueDate);
    return result.lastInsertRowid as number;
  }

  async update(
    id: TodoEntity["id"],
    todo: Omit<TodoEntityProps, "id">
  ): Promise<TodoEntity["id"]> {
    db.prepare(
      "UPDATE todos SET title = ?, description = ?, dueDate = ? WHERE id = ?"
    ).run(todo.title, todo.description, todo.dueDate, id);
    return id;
  }

  async delete(id: TodoEntity["id"]): Promise<void> {
    db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  }
}
