
// Types ----------------------------------------------------------------------------
import type { Session } from "@/types";
// Packages -------------------------------------------------------------------------
import { redirect } from "next/navigation";
import { auth } from "./auth";
// Data -----------------------------------------------------------------------------
import { PROJECT_USER_ROLE_STANDARD_ALLOWED, PROJECT_USER_ROLES } from "@/data/_config";
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { checkAllowedRoles } from "@/util";



//______________________________________________________________________________________
// ===== Types =====

interface OptionsActionProtection {
    /** optional string, default is `PROJECT_USER_ROLE_HIGHEST`. Defines the required role to access the page. */
    allowedRoles?: Array<keyof typeof PROJECT_USER_ROLES>;
}

export interface OptionsPageProtection extends OptionsActionProtection {
    /** optional string, default is "/". Defines the destination to redirect to if the user is not logged in. */
    redirectNotLoggedIn?: string | false;

    /** optional string, default is "/". Defines the destination to redirect to if the user is not authorized. */
    redirectUnauthorized?: string;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS_ACTION = {
    allowedRoles: PROJECT_USER_ROLE_STANDARD_ALLOWED,
}

const DEFAULT_OPTIONS_PAGE = {
    ...DEFAULT_OPTIONS_ACTION,
    redirectNotLoggedIn: "/",
    redirectUnauthorized: "/",
}



//______________________________________________________________________________________
// ===== Functions =====

export const actionProtection = async (options: OptionsActionProtection = {}) => {
    const { allowedRoles } = { ...DEFAULT_OPTIONS_ACTION, ...options };
    const session = await auth() as Session | null;
    if(!session) return { error: true, message: "Unauthorized!", session };
    if(!checkAllowedRoles(session, allowedRoles)) return { error: true, message: "Forbidden!", session };
    return { error: false, message: "Success!", session };
}

export const pageProtection = async (options: OptionsPageProtection = {}) => {
    const { allowedRoles, redirectNotLoggedIn, redirectUnauthorized } = { ...DEFAULT_OPTIONS_PAGE, ...options };
    const session = await auth() as Session | null;
    if(redirectNotLoggedIn && (!session)) return redirect(redirectNotLoggedIn);
    if(!checkAllowedRoles(session, allowedRoles)) return redirect(redirectUnauthorized);
    if(!session?.user?.username) return redirect("/settings");
    return { error: false, message: "Success!", session }; 
}