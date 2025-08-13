import { sleep } from "@/_legoBlocks/nextjsCommon/util";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { authorize } from "./auth";
import { profanityCheck } from "@/util/profanityCheck";



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

export const readUserProfile = query({
    handler: async (ctx) => authorize(ctx, async ({ userId }) => {
        return await ctx.db.query("userProfile").withIndex("userId", (q) => q.eq("userId", userId)).first();
    }, { trace: "readUserProfile" }),
});



//______________________________________________________________________________________
// ===== Creates =====

// const createUserProfile = internalMutation({
//     args: { username: v.string() },
//     handler: async (ctx, args) => authorize(ctx, async ({ userId }) => {
//         return await ctx.db.insert("userProfile", { userId, username: args.username });
//     }, { trace: "createUserProfile" }),
// });



//______________________________________________________________________________________
// ===== Updates =====

export const updateUserProfile = mutation({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const { username } = args;
        if(profanityCheck(username)) return { error: true, message: "Username may not contain profanity.", data: { errorLocation: "username" } };

        return authorize(ctx, async ({ userId }) => {
            const userProfiles = await ctx.db.query("userProfile").collect();
            const matchedUserProfile = userProfiles.find(userProfile => {
                return userProfile.userId !== userId && userProfile.username === username; // TODO: use toStringComparison 
            });
            if(matchedUserProfile?.username) throw new Error("usernameTaken");

            const userProfile = await ctx.db.query("userProfile").withIndex("userId", (q) => q.eq("userId", userId)).first();
            
            if(!userProfile?._id) return await ctx.db.insert("userProfile", { userId, username });

            return await ctx.db.patch(userProfile._id, { username });
        }, { trace: "updateUserProfile" })
    },
});



//______________________________________________________________________________________
// ===== Deletes =====

// export const deleteTodo = mutation({
//     args: { _id: v.id("todo") },
//     handler: async (ctx, args) => {
//         const { _id } = args;
//         await ctx.db.delete(_id);
//     },
// });
