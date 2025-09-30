import type { TodoRepository } from "./todo.repository";
import type { TodoEntityProps } from "./todo.entity";

export class TodoUseCases {
  constructor(private readonly todoRepository: TodoRepository) {}

  getAll() {
    return this.todoRepository.findAll();
  }

  getById(id: number) {
    return this.todoRepository.findById(id);
  }

  create(todo: Omit<TodoEntityProps, "id">) {
    return this.todoRepository.create(todo);
  }

  update(id: number, todo: Omit<TodoEntityProps, "id">) {
    return this.todoRepository.update(id, todo);
  }

  delete(id: number) {
    return this.todoRepository.delete(id);
  }
}
