import { supabase } from '../lib/supabase'
import { Todo } from '../types/todo'

export async function fetchTodos(userId: string): Promise<Todo[]> {
  let { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data || []
}

export async function addTodo(userId: string, title: string) {
  const { error } = await supabase.from('todos').insert([
    {
      user_id: userId,
      title: title,
      is_complete: false,
    },
  ])
  if (error) throw error
}

export async function toggleTodo(todoId: string, currentStatus: boolean) {
  const { error } = await supabase
    .from('todos')
    .update({ is_complete: !currentStatus })
    .eq('id', todoId)
  if (error) throw error
}

export async function updateTodoTitle(todoId: string, title: string) {
  const { error } = await supabase
    .from('todos')
    .update({ title })
    .eq('id', todoId)
  if (error) throw error
}

export async function deleteTodo(todoId: string) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)
  if (error) throw error
}
