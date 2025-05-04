import { Button, ListItem, CheckBox, Icon } from '@rneui/themed'
import { Todo } from '../types/todo'

type Props = {
  todo: Todo
  onToggle: (id: string, currentStatus: boolean) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <ListItem
      bottomDivider
      containerStyle={{ borderRadius: 10, marginVertical: 6, padding: 12, backgroundColor: '#f9f9f9' }}
    >
      <CheckBox
        checked={todo.is_complete}
        onPress={() => onToggle(todo.id, todo.is_complete)}
        containerStyle={{ margin: 0, padding: 0 }}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontSize: 18,
            textDecorationLine: todo.is_complete ? 'line-through' : 'none',
            color: todo.is_complete ? '#aaa' : '#333',
          }}
        >
          {todo.title}
        </ListItem.Title>
      </ListItem.Content>
      <Icon
        name="delete"
        type="material"
        color="#ff5c5c"
        onPress={() => onDelete(todo.id)}
      />
    </ListItem>
  )
}
