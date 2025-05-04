import { useEffect, useState } from 'react'
import { View, FlatList, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native'
import { Todo } from '../types/todo'
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../services/todoService'
import TodoItem from '../components/TodoItem'
import { sortTodos } from '../logic/todoLogic'
import { supabase } from '../lib/supabase'

type Props = {
  onLogout: () => void
}

export default function TodoScreen({ onLogout }: Props) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = supabase.auth.getUser()
    user.then(({ data }) => {
      if (data?.user?.id) {
        loadTodos(data.user.id)
      }
    })
  }, [])

  async function loadTodos(userId: string) {
    setLoading(true)
    const fetchedTodos = await fetchTodos(userId)
    setTodos(sortTodos(fetchedTodos))
    setLoading(false)
  }

  async function handleAddTodo() {
    const user = await supabase.auth.getUser()
    const userId = user.data.user?.id
    if (!userId) return
    if (!newTodo.trim()) {
      Alert.alert('Input Required', 'Please enter a todo.')
      return
    }

    await addTodo(userId, newTodo)
    setNewTodo('')
    loadTodos(userId)
  }

  async function handleToggle(id: string, currentStatus: boolean) {
    await toggleTodo(id, currentStatus)
    const user = await supabase.auth.getUser()
    if (user.data.user?.id) loadTodos(user.data.user.id)
  }

  async function handleDelete(id: string) {
    await deleteTodo(id)
    const user = await supabase.auth.getUser()
    if (user.data.user?.id) loadTodos(user.data.user.id)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    onLogout()
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Todo List ✍️</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new task"
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => {
          const user = supabase.auth.getUser()
          user.then(({ data }) => {
            if (data?.user?.id) loadTodos(data.user.id)
          })
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>No todos yet! 🎉</Text>
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
})
