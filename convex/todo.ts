import { sleep } from "@/_legoBlocks/nextjsCommon/util";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { convexSafety } from "./convexSafety";



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
    handler: async (ctx) => convexSafety(async ({ options }) => {
        const todos = await ctx.db.query("todo").collect();
        // throw new Error("Dev Error: readTodos");
        return todos;
    }, { trace: "readTodos" }),
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
    handler: async (ctx, args) => convexSafety(async ({ options }) => {
        const { _id, display, description } = args;

        // throw new Error("Dev Error: updateTodo");

        // `replace` will replace the existing document entirely, potentially removing existing fields.
        // const taskId = await ctx.db.replace(id, { display, description, isCompleted: false });

        // `patch` performs a shallow merge with the given partial document. New fields are 
        // added. Existing fields are overwritten. Fields set to undefined are removed.
        return await ctx.db.patch(_id, { display, description });
    }, { trace: "updateTodo" }),
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
