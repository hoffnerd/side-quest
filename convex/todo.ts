import { sleep } from "@/_legoBlocks/nextjsCommon/util";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { authorize } from "./auth";


//______________________________________________________________________________________
// ===== Convex Actions =====

// export const sleepAction = action({
//     args: { milliseconds: v.number() },
//     handler: async (ctx, args) => {
//         console.log("sleepAction start");
//         await sleep(args.milliseconds);
//         console.log("sleepAction end");
//         return args.milliseconds;
//     },
// });



//______________________________________________________________________________________
// ===== Reads =====

export const readTodos = query({
    handler: async (ctx) => authorize(ctx, async ({ userId }) => {
        const todos = await ctx.db.query("todo").withIndex("userId", (q) => q.eq("userId", userId)).collect();
        // throw new Error("Dev Error: readTodos");
        return todos;
    }, { trace: "readTodos" }),
});

export const readTodo = query({
    args: { _id: v.id("todo") },
    handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
        const todo = await ctx.db.get(args._id);
        if(todo?.userId !== userId) throw new Error("You do not own this todo!");
        return todo;
    }, { trace: "readTodo" }),
});



//______________________________________________________________________________________
// ===== Creates =====

export const createTodo = mutation({
    args: { 
        display: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
        const { display, description } = args;
        return await ctx.db.insert("todo", {
            userId,
            display,
            description,
            isCompleted: false,
        });
    }, { trace: "createTodo" }),
});



//______________________________________________________________________________________
// ===== Updates =====

export const updateTodo = mutation({
    args: {
        _id: v.id("todo"),
        display: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
        const { _id, display, description } = args;

        const todo = await ctx.db.get(_id);
        if(todo?.userId !== userId) throw new Error("You do not own this todo!");

        // throw new Error("Dev Error: updateTodo");

        // `replace` will replace the existing document entirely, potentially removing existing fields.
        // const taskId = await ctx.db.replace(id, { display, description, isCompleted: false });

        // `patch` performs a shallow merge with the given partial document. New fields are 
        // added. Existing fields are overwritten. Fields set to undefined are removed.
        await ctx.db.patch(_id, { display, description });
    }, { trace: "updateTodo" }),
});

export const updateTodoIsCompleted = mutation({
    args: {
        _id: v.id("todo"),
        isCompleted: v.boolean(),
    },
    handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
        const { _id, isCompleted } = args;

        const todo = await ctx.db.get(_id);
        if(todo?.userId !== userId) throw new Error("You do not own this todo!");

        await ctx.db.patch(_id, { isCompleted });
    }, { trace: "updateTodoIsCompleted" }),
});



//______________________________________________________________________________________
// ===== Deletes =====

export const deleteTodo = mutation({
    args: { _id: v.id("todo") },
    handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
        const { _id } = args;

        const todo = await ctx.db.get(_id);
        if(todo?.userId !== userId) throw new Error("You do not own this todo!");
        
        await ctx.db.delete(_id);
    }, { trace: "deleteTodo" }),
});
