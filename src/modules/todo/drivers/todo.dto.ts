import z from "zod";

export const todoDto = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
});

export const allTodoDto = {
  response: z.array(todoDto),
};

export const byIdTodoDto = {
  params: z.object({
    id: z.string(),
  }),
  response: todoDto,
};

export const createTodoDto = {
  body: todoDto.omit({ id: true }),
  response: z.object({
    id: z.number(),
  }),
};

export const updateTodoDto = {
  params: z.object({
    id: z.string(),
  }),
  body: todoDto.omit({ id: true }),
  response: z.object({
    id: z.number(),
  }),
};

export const deleteTodoDto = {
  params: z.object({
    id: z.string(),
  }),
  response: z.object({
    id: z.number(),
  }),
};
