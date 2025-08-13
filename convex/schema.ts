import { defineSchema, defineTable } from "convex/server";
import { v, type Validator } from "convex/values";



//______________________________________________________________________________________
// ===== Auth Tables =====

// https://stack.convex.dev/nextauth-adapter

export const userSchema = {
    email: v.string(),
    name: v.optional(v.string()),
    emailVerified: v.optional(v.number()),
    image: v.optional(v.string()),
};

export const sessionSchema = {
    userId: v.id("users"),
    expires: v.number(),
    sessionToken: v.string(),
};

export const accountSchema = {
    userId: v.id("users"),
    type: v.union(
        v.literal("email"),
        v.literal("oidc"),
        v.literal("oauth"),
        v.literal("webauthn"),
    ),
    provider: v.string(),
    providerAccountId: v.string(),
    refresh_token: v.optional(v.string()),
    access_token: v.optional(v.string()),
    expires_at: v.optional(v.number()),
    token_type: v.optional(v.string() as Validator<Lowercase<string>>),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
    session_state: v.optional(v.string()),
};

export const verificationTokenSchema = {
    identifier: v.string(),
    token: v.string(),
    expires: v.number(),
};

export const authenticatorSchema = {
    credentialID: v.string(),
    userId: v.id("users"),
    providerAccountId: v.string(),
    credentialPublicKey: v.string(),
    counter: v.number(),
    credentialDeviceType: v.string(),
    credentialBackedUp: v.boolean(),
    transports: v.optional(v.string()),
};

const authTables = {
    users: defineTable(userSchema).index("email", ["email"]),
    sessions: defineTable(sessionSchema)
        .index("sessionToken", ["sessionToken"])
        .index("userId", ["userId"]),
    accounts: defineTable(accountSchema)
        .index("providerAndAccountId", ["provider", "providerAccountId"])
        .index("userId", ["userId"]),
    verificationTokens: defineTable(verificationTokenSchema).index(
        "identifierToken",
        ["identifier", "token"],
    ),
    authenticators: defineTable(authenticatorSchema)
        .index("userId", ["userId"])
        .index("credentialID", ["credentialID"]),
};



//______________________________________________________________________________________
// ===== Validators =====

export const userMetadataRoleValidator = v.union(
    v.literal("admin"),
    v.literal("tester"),
    v.literal("user"),
    v.literal("unauthorized"),
);



//______________________________________________________________________________________
// ===== Schema Definition =====

export default defineSchema({
    ...authTables,
    userMetadata: defineTable({
        userId: v.id("users"),
        role: userMetadataRoleValidator,
    }).index("userId", ["userId"]),
    userProfile: defineTable({
        userId: v.id("users"),
        username: v.string(),
    }).index("userId", ["userId"]),
    todo: defineTable({
        userId: v.id("users"),
        display: v.string(),
        description: v.optional(v.string()),
        isCompleted: v.boolean(),
    }).index("userId", ["userId"]),
});