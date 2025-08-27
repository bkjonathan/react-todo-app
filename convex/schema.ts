import { v } from 'convex/values';
import { defineSchema, defineTable } from 'convex/server';

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});
