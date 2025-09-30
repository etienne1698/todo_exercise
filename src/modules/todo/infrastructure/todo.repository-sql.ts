import { db } from "~/shared/infrastructure/sql/database";
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

  async create(todo: TodoEntity): Promise<TodoEntity["id"]> {
    const result = db
      .prepare(
        "INSERT INTO todos (title, description, dueDate, completed) VALUES (?, ?, ?, ?)"
      )
      .run(todo.title, todo.description, todo.dueDate.toISOString(), +todo.completed);
    return result.lastInsertRowid as number;
  }

  async update(
    id: TodoEntity["id"],
    todo: TodoEntity
  ): Promise<TodoEntity["id"]> {
    db.prepare(
      "UPDATE todos SET title = ?, description = ?, dueDate = ?, completed = ? WHERE id = ?"
    ).run(todo.title, todo.description, todo.dueDate.toISOString(), +todo.completed, id);
    return id;
  }

  async delete(id: TodoEntity["id"]): Promise<void> {
    db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  }
}
