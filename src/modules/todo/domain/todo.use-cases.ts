import type { TodoRepository } from "./todo.repository";
import { TodoEntity, type TodoEntityProps } from "./todo.entity";

export class TodoUseCases {
  constructor(private readonly todoRepository: TodoRepository) {}

  getAll() {
    return this.todoRepository.findAll();
  }

  getById(id: TodoEntity["id"]) {
    return this.todoRepository.findById(id);
  }

  create(todo: TodoEntityProps) {
    const todoEntity = new TodoEntity(todo);
    todoEntity.validate();
    return this.todoRepository.create(todoEntity);
  }

  update(id: TodoEntity["id"], todo: TodoEntityProps) {
    const todoEntity = new TodoEntity(todo);
    todoEntity.validate();
    return this.todoRepository.update(id, todoEntity);
  }

  delete(id: TodoEntity["id"]) {
    return this.todoRepository.delete(id);
  }
}
