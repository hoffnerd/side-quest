import { mutation, query } from "./_generated/server";
import { v } from "convex/values";



//______________________________________________________________________________________
// ===== Reads =====

export const readTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todo").collect();
        return todos;
    },
});

export const readTodo = query({
    args: { id: v.id("todo") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        return todo;
    },
});



//______________________________________________________________________________________
// ===== Creates =====

export const createTodo = mutation({
    args: { 
        display: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { display, description } = args;
        const taskId = await ctx.db.insert("todo", {
            display,
            description,
            isCompleted: false,
        });

        // No need to return if you are not using the return value
        // return taskId;
    },
});



//______________________________________________________________________________________
// ===== Updates =====

export const updateTodo = mutation({
    args: {
        _id: v.id("todo"),
        display: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { _id, display, description } = args;

        // `replace` will replace the existing document entirely, potentially removing existing fields.
        // const taskId = await ctx.db.replace(id, { display, description, isCompleted: false });

        // `patch` performs a shallow merge with the given partial document. New fields are 
        // added. Existing fields are overwritten. Fields set to undefined are removed.
        await ctx.db.patch(_id, { display, description });
    },
});

export const updateTodoIsCompleted = mutation({
    args: {
        _id: v.id("todo"),
        isCompleted: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { _id, isCompleted } = args;
        await ctx.db.patch(_id, { isCompleted });
    },
});



//______________________________________________________________________________________
// ===== Deletes =====

export const deleteTodo = mutation({
    args: { _id: v.id("todo") },
    handler: async (ctx, args) => {
        const { _id } = args;
        await ctx.db.delete(_id);
    },
});
