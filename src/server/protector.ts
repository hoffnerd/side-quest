import "server-only";

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
// Data -----------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { api } from "convex/_generated/api";



//______________________________________________________________________________________
// ===== Types =====

export interface OptionsPageProtection {
    /** optional string, default is "/". Defines the destination to redirect to if the user is not logged in. */
    redirectUnauthorized?: string;

    /** optional string, default is "/". Defines the destination to redirect to if the user is not authorized. */
    redirectForbidden?: string;

    shouldAllowUnauthorized?: boolean;
    shouldOnlyAllowUnauthorized?: boolean;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS_PAGE = {
    redirectUnauthorized: "/",
    redirectForbidden: "/",
    shouldAllowUnauthorized: false,
    shouldOnlyAllowUnauthorized: false,
}



//______________________________________________________________________________________
// ===== Functions =====

export const pageProtection = async (options: OptionsPageProtection = {}) => {
    const { 
        redirectUnauthorized,
        redirectForbidden,
        shouldAllowUnauthorized,
        shouldOnlyAllowUnauthorized,
    } = { ...DEFAULT_OPTIONS_PAGE, ...options };
    const { error, message, data: userRole } = await fetchQuery(api.userMetadata.readUserRole);
    console.log({
        trace: "pageProtection",
        options: {
            redirectUnauthorized,
            redirectForbidden,
            shouldAllowUnauthorized,
            shouldOnlyAllowUnauthorized,
        },
        error,
        message,
        userRole,
    })
    // if(shouldOnlyAllowUnauthorized && userRole !== "unauthorized") return redirect(redirectForbidden);
    // if(error) {
    //     if(message === "Unauthorized!" && !shouldAllowUnauthorized) return redirect(redirectUnauthorized);
    //     if(message === "Forbidden!") return redirect(redirectForbidden);
    //     if( !["Unauthorized!", "Forbidden!"].includes(message) ) return { error: true, message };
    // }
    return { error: false, message: "Success!" }; 
}