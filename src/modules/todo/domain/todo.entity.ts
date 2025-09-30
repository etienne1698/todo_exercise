export interface TodoEntityProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export class TodoEntity implements TodoEntityProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;

  constructor(props: TodoEntityProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.dueDate = props.dueDate;
  }
}
