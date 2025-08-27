import { mutation, query } from '@/convex/_generated/server';
import { ConvexError, v } from 'convex/values';

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query('todos').order('desc').collect();
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert('todos', {
      text: args.text,
      isCompleted: false,
    });
  },
});

export const updateTodo = mutation({
  args: { id: v.id('todos'), text: v.string() },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError('Todo not exists');
    }
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const toggleTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError('Todo not exists');
    }
    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const deleteAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').collect();

    // Delete all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});
