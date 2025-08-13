
// Types ---------------------------------------------------------------------------
import type { GenericQueryCtx } from "convex/server";
import type { DataModel, Id } from "./_generated/dataModel";
import type { PROJECT_USER_ROLES } from "@/data/_config";
// Packages ------------------------------------------------------------------------
// Server --------------------------------------------------------------------------
// Components ----------------------------------------------------------------------
// Data ----------------------------------------------------------------------------
import { PROJECT_USER_ROLE_STANDARD_ALLOWED } from "@/data/_config";
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Interfaces =====

interface Options {
    trace?: string;
    allowedRoles?: Array<keyof typeof PROJECT_USER_ROLES>
}

//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    trace: "authorizeUser",
    allowedRoles: PROJECT_USER_ROLE_STANDARD_ALLOWED,
}

//______________________________________________________________________________________
// ===== Functions =====

const handleError = ({ trace, message }: { trace: string, message: string }) => {
    console.error({ trace, message });
    return { error: true, message, data: undefined };
}

const authorizeRole = async (
    ctx: GenericQueryCtx<DataModel>,
    userId: Id<"users">,
    allowedRoles?: Array<keyof typeof PROJECT_USER_ROLES>
) => {
    const allowedRolesToUse = allowedRoles ?? PROJECT_USER_ROLE_STANDARD_ALLOWED;
    const userMetadata = await ctx.db.query("userMetadata").withIndex("userId", (q) => q.eq("userId", userId)).first();
    const userRole = userMetadata?.role ?? "unauthorized";
    if(!allowedRolesToUse.includes(userRole)) return false;
    return userRole;
}

const getUserId = async (ctx: GenericQueryCtx<DataModel>) => {
    const userId = await ctx.auth.getUserIdentity();
    if (userId === null) return null;
    return userId.subject as Id<"users">;
}

export const authorize = async <T> (
    ctx: GenericQueryCtx<DataModel>,
    callback: ( props: { 
        userId: Id<"users">; 
        userRole: keyof typeof PROJECT_USER_ROLES; 
        options: Options; 
    } ) => Promise<T>,
    options: Options = {}
) => {
    // get any options, defaulted or passed in
    const optionsToUse = { ...DEFAULT_OPTIONS, ...options }
    const { trace, allowedRoles } = optionsToUse;

    try {
        const userId = await getUserId(ctx);
        console.log({
            trace: "authorize",
            givenTrace: trace,
            ctx,
            userId,
        })
        if (!userId) throw new Error("Unauthorized!");
        console.log("===== Passed userId =====")

        const userRole = await authorizeRole(ctx, userId, allowedRoles);
        console.log({
            trace: "authorize",
            givenTrace: trace,
            userRole,
        })
        if (!userRole) throw new Error("Forbidden!");
        console.log("===== Passed userRole =====")

        // try to run the given `callback` function, gracefully fails if any errors are thrown
        const data = await callback({ userId, userRole, options: optionsToUse });

        // send back the data in a normalized way
        return { error: false, message: "Success!", data };
    } catch (e: any) {
        return handleError({ trace, message: e?.message || "Unknown Error!" });
    }
}