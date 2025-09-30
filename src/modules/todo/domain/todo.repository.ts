import type { TodoEntity, TodoEntityProps } from "./todo.entity";

export interface TodoRepository {
  findAll(): Promise<TodoEntity[]>;
  findById(id: TodoEntity["id"]): Promise<TodoEntity>;
  create(todo: Omit<TodoEntityProps, "id">): Promise<TodoEntity['id']>;
  update(id: TodoEntity["id"], todo: Omit<TodoEntityProps, "id">): Promise<TodoEntity['id']>;
  delete(id: TodoEntity["id"]): Promise<void>;
}