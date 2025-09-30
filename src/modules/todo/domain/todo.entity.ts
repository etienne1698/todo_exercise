import { Entity } from "~/shared/domain/entity";
import { ValidationError } from "~/shared/domain/errors";
import { isInvalidDate } from "~/shared/domain/helpers";

export interface TodoEntityProps {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export class TodoEntity extends Entity {
  id?: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;

  constructor(props: TodoEntityProps & { id?: number }) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.dueDate = new Date(props.dueDate);
    this.completed = Boolean(props.completed);
  }

  validate(): void {
    if (this.title.length < 3) {
      throw new ValidationError("Title must be at least 3 characters long", [
        "title",
      ]);
    }
    if (isInvalidDate(this.dueDate)) {
      throw new ValidationError("Due date is invalid", ["dueDate"]);
    }
  }
}
