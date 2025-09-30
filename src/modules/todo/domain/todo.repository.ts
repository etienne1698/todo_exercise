import type { TodoEntity } from "./todo.entity";

export interface TodoRepository {
  findAll(): Promise<TodoEntity[]>;
  findById(id: TodoEntity["id"]): Promise<TodoEntity>;
  create(todo: TodoEntity): Promise<TodoEntity['id']>;
  update(id: TodoEntity["id"], todo: TodoEntity): Promise<TodoEntity['id']>;
  delete(id: TodoEntity["id"]): Promise<void>;
}