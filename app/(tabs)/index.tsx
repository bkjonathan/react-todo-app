import { Alert, SafeAreaView, StatusBar } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Doc, Id } from '@/convex/_generated/dataModel';
import TodoList from '@/components/TodoList';
import { useState } from 'react';

// Types
export type Todo = Doc<'todos'>;

export default function Index() {
  const { colors } = useTheme();

  // Local state for editing
  const [editingId, setEditingId] = useState<Id<'todos'> | null>(null);
  const [editedText, setEditedText] = useState('');

  // Styles and data hooks
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  // Handlers
  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id });
    } catch (e) {
      console.log('Error: ', e);
      Alert.alert('Error', 'Failed to toggle todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: Id<'todos'>) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditedText(todo.text);
    setEditingId(todo._id);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editedText.trim()) return;
    try {
      await updateTodo({ id: editingId, text: editedText.trim() });
      setEditingId(null);
      setEditedText('');
    } catch (e) {
      console.log('Error: ', e);
      Alert.alert('Error', 'Can not edit todo. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText('');
  };

  // Loading state
  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;

  // UI
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <TodoList
          data={todos}
          editingId={editingId}
          editedText={editedText}
          onChangeEditedText={setEditedText}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          colors={colors}
          styles={homeStyles}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
