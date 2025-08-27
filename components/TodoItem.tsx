import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { FC, memo } from 'react';
import { ColorScheme } from '@/hooks/useTheme';

// Type alias for clarity
export type Todo = Doc<'todos'>;

export type TodoItemProps = {
  item: Todo;
  isEditing: boolean;
  editedText: string;
  onChangeEditedText: (text: string) => void;
  onToggle: (id: Id<'todos'>) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: Id<'todos'>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  colors: ColorScheme; // colors coming from useTheme()
  styles: ReturnType<
    typeof import('@/assets/styles/home.styles').createHomeStyles
  >;
};

const TodoItem: FC<TodoItemProps> = ({
  item,
  isEditing,
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
  return (
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.checkbox}
          activeOpacity={0.7}
          onPress={() => onToggle(item._id)}
        >
          <LinearGradient
            colors={
              item.isCompleted
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              styles.checkboxInner,
              {
                borderColor: item.isCompleted ? 'transparent' : colors.border,
              },
            ]}
          >
            {item.isCompleted && (
              <Ionicons name="checkmark" size={18} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={editedText}
              onChangeText={onChangeEditedText}
              autoFocus
              multiline
              placeholder="Edit your Todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={styles.editButtons}>
              <TouchableOpacity onPress={onSaveEdit} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.success}
                  style={styles.editButton}
                >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={styles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={onCancelEdit} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.muted}
                  style={styles.editButton}
                >
                  <Ionicons name="close" size={16} color="#fff" />
                  <Text style={styles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.todoTextContainer}>
            <Text
              style={[
                styles.todoText,
                item.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={styles.todoActions}>
              <TouchableOpacity
                onPress={() => onEdit(item)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={styles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onDelete(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={styles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default memo(TodoItem);
