import { Todo } from '../types/todo'

export function sortTodos(todos: Todo[]): Todo[] {
  return todos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function filterIncompleteTodos(todos: Todo[]): Todo[] {
  return todos.filter(todo => !todo.is_complete);
}
