import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    todo: defineTable({
        display: v.string(),
        description: v.optional(v.string()),
        isCompleted: v.boolean(),
    }),
});