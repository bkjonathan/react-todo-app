import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import EmptyState from '@/components/EmptyState';
import TodoItem, { Todo } from '@/components/TodoItem';
import { Id } from '@/convex/_generated/dataModel';

export type TodoListProps = {
  data: readonly Todo[] | undefined;
  editingId: Id<'todos'> | null;
  editedText: string;
  onChangeEditedText: (text: string) => void;
  onToggle: (id: Id<'todos'>) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: Id<'todos'>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  colors: any;
  styles: ReturnType<typeof import('@/assets/styles/home.styles').createHomeStyles>;
};

const TodoList: React.FC<TodoListProps> = ({
  data,
  editingId,
  editedText,
  onChangeEditedText,
  onToggle,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  colors,
  styles,
}) => {
  const renderItem = useCallback<ListRenderItem<Todo>>(
    ({ item }) => (
      <TodoItem
        item={item}
        isEditing={editingId === item._id}
        editedText={editedText}
        onChangeEditedText={onChangeEditedText}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        colors={colors}
        styles={styles}
      />
    ),
    [editingId, editedText, onChangeEditedText, onToggle, onEdit, onDelete, onSaveEdit, onCancelEdit, colors, styles]
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.todoList}
      contentContainerStyle={styles.todoListContent}
      ListEmptyComponent={<EmptyState />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default React.memo(TodoList);
