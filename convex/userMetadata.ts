
import { query } from "./_generated/server";
import { authorize } from "./auth";



//______________________________________________________________________________________
// ===== Reads =====

export const readUserRole = query({
    handler: async (ctx) => {
        console.log("===== in readUserRole =====")
        return authorize(ctx, async ({ userId }) => {
            console.log("===== in authorize of readUserRole =====")
            const userMetadata = await ctx.db.query("userMetadata").withIndex("userId", (q) => q.eq("userId", userId)).first();
            // console.log({
            //     trace: "readUserRole",
            //     userMetadata
            // })
            if(!userMetadata) throw new Error("User not found!");
            return userMetadata.role;
        }, { trace: "readUserRole" })
    },
});



//______________________________________________________________________________________
// ===== Creates =====

// export const createTodo = mutation({
//     args: { 
//         display: v.string(),
//         description: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => {
//         const { display, description } = args;
//         const taskId = await ctx.db.insert("todo", {
//             display,
//             description,
//             isCompleted: false,
//         });

//         // No need to return if you are not using the return value
//         // return taskId;
//     },
// });



//______________________________________________________________________________________
// ===== Updates =====

// export const updateTodo = mutation({
//     args: {
//         _id: v.id("todo"),
//         display: v.string(),
//         description: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => convexSafety(async ({ options }) => {
//         const { _id, display, description } = args;
//         return await ctx.db.patch(_id, { display, description });
//     }, { trace: "updateTodo" }),
// });

// export const updateTodoIsCompleted = mutation({
//     args: {
//         _id: v.id("todo"),
//         isCompleted: v.boolean(),
//     },
//     handler: async (ctx, args) => {
//         const { _id, isCompleted } = args;
//         await ctx.db.patch(_id, { isCompleted });
//     },
// });



//______________________________________________________________________________________
// ===== Deletes =====

// export const deleteTodo = mutation({
//     args: { _id: v.id("todo") },
//     handler: async (ctx, args) => {
//         const { _id } = args;
//         await ctx.db.delete(_id);
//     },
// });
