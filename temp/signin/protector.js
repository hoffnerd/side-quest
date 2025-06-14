import "server-only";

/** @import { Session } from "next-auth" */
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/authOptions';
import { checkRoleAccessLevel } from '@/submodules/common-utils/utils/protector';
import { redirect } from "next/navigation";



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    requiredRole: "ADMIN",
    shouldRedirect: true,
    redirectNotLoggedIn: "/",
    redirectUnauthorized: "/",
    allowFalsyRole: false,
    legacyBehavior: false,
};



//______________________________________________________________________________________
// ===== Deprecated Functions =====

/**
 * @deprecated
 * This function should still work how it was expected to. 
 * Marked as deprecated because a better strategy has been made. 
 * Please use the `pageProtection` function.
 * 
 * Accepts a configuration object and may redirect the user based on the user's logged-in status and role ("ADMIN", "USER", etc.).
 * Returns the session object
 * NOTE: Must be used in a server component. If you use this in a client component you will get an error.
 * @param {object} config - An object in the following form:
 * {
 *      requiredRole: <<String indicating the requred role (Usually "ADMIN" or "USER")>>,
 *      redirectDestination: {
 *          notLoggedIn: <<URL to send the user to if they are not logged in (usually something like "/api/auth/signin?callbackUrl=<<Protected page's URL>>"
 *                  which will send the user to a login page and once they log in will send them back to the protected page)>>,
 *          notAuthorized: <<URL to send the user to if they are logged in but do not have the access level required to view the protected page
 *                  (Usually "/" to send the user back to the root page of the application)>>,
 *      },
 * }
 * @returns The session object
 */
export const pageProtector = async (config, options={}) => {
    let protectionOptions = { ...config, ...options };
    if(config.redirectDestination?.notLoggedIn) protectionOptions.redirectNotLoggedIn = config.redirectDestination.notLoggedIn;
    if(config.redirectDestination?.notAuthorized) protectionOptions.redirectUnauthorized = config.redirectDestination.notAuthorized;
    return pageProtection({ ...protectionOptions, legacyBehavior:true });

    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     if (config?.redirectDestination?.notLoggedIn) {
    //         redirect(config.redirectDestination.notLoggedIn);
    //     } else {
    //         return session;
    //         console.error("You may not have specified a destination to redirect to when a user is not logged in.");
    //         redirect("/");
    //     }
    // } else if (!checkRoleAccessLevel(session, config.requiredRole, options)) {
    //     if (config?.redirectDestination?.notAuthorized) {
    //         redirect(config.redirectDestination.notAuthorized);
    //     } else {
    //         console.error("You may not have specified a destination to redirect to when a user is not authorized.");
    //         redirect("/");
    //     }
    // }
    // return session;
};

/**
 * @deprecated
 * This function should still work how it was expected to. 
 * Marked as deprecated because a better strategy has been made. 
 * Please use the `actionProtection` function.
 * 
 * It checks if the user is logged in, if they are, it checks if they have the required role to access
 * the api route, if they do, it returns an object with the session and a success message, if they don't, it
 * returns an object with the session and an unauthorized message, if they aren't logged in, it returns
 * an object with a not logged in message
 * @param config - A configuration object that must have a requiredRole property
 * @returns {Promise<{authorized: boolean, message: string, session: Session}>}
 */
export const apiProtector = async (config, options={}) => {
    return await actionProtection({ ...config, ...options, legacyBehavior:true });

    // const session = await getServerSession( authOptions )
    // if(checkRoleAccessLevel(session, config.requiredRole, options)){
    //     return { authorized: true, message: "Success!", session }
    // }
    // else if(session && session.user && session.user.role){
    //     return { authorized: false, message: "Forbidden!", session }
    // }
    // return { authorized: false, message: "Unauthorized!" };
}

/**
 * @deprecated 
 * This function should still work how it was expected to. 
 * Marked as deprecated because a better strategy has been made. 
 * Please use the `actionProtection` function.
 * 
 * Retrieves the server session using the authentication options that are defined in @/lib/authOptions.
 * Use this function if you need session data in a server component but do not need to put it behind the page or api protector
 * @returns {Promise<Session | {error: boolean, message: string}>} the session for use in server components.
 */
export const readServerSession = async (config={ requiredRole:"USER" }, options={}) => {
    return await pageProtection({ ...config, ...options, legacyBehavior:true, shouldRedirect: false });

    // const session = await getServerSession(authOptions);
    // if(!checkRoleAccessLevel(session, config.requiredRole, options)){
    //     console.error("Unauthorized!", { trace: config.trace || "readServerSession", session });
    //     return { error:true, message:"Unauthorized!" }
    // }
    // return session
}



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Ensures access control based on user roles and authentication status.
 * @param {object} [options] - optional object that controls how this function should behave.
 * @param {string} [options.requiredRole] - string, the role the user should be to access this page.
 * @param {string} [options.redirectNotLoggedIn] - optional string, default is "/". Where to redirect to if user is not 
 * logged in. Set to `false` to just returns a the object described in the `@returns` section below instead of redirecting.
 * @param {string} [options.redirectUnauthorized] - optional string, default is "/". Where to redirect to if user is not Unauthorized 
 * to be on this page. Set to `false` to just returns a the object described in the `@returns` section below instead of redirecting.
 * @param {boolean} [options.exactMatch] - optional bool, default is `false`. Set to `true` to make sure the user role is an exact match on the given `requiredRole`.
 * @param {boolean} [options.inverse] - optional bool, default is `false`. Set to `true` to make sure the user role is BELOW the given `requiredRole`.
 * @returns { Promise<{ 
 *  authorized: boolean;
 *  error: "e_forbidden" | "e_unauthorized" | false;
 *  message: string; 
 *  session: Session; 
 * } | void> } 
 * - will return the object described if user is able to access this page, otherwise will redirect where given
 */
export const pageProtection = async (options={}) => {
    const { requiredRole, redirectNotLoggedIn, redirectUnauthorized, allowFalsyRole, legacyBehavior } = { ...DEFAULT_OPTIONS, ...options };
    if(!requiredRole){
        if(allowFalsyRole) return { authorized: true, error: false, message: "Success!", session: true }
        return redirect(redirectNotLoggedIn);
    }
    
    const session = await getServerSession(authOptions);
    
    if (!session){ 
        if(!redirectNotLoggedIn){
            if(legacyBehavior) return null;
            return { authorized: false, error:"e_unauthorized", message: "Unauthorized!", session }
        }
        return redirect(redirectNotLoggedIn);
    }

    if (!checkRoleAccessLevel(session, requiredRole, options)){
        if(!redirectUnauthorized){
            if(legacyBehavior) return null;
            return { authorized: false, error:"e_forbidden", message: "Forbidden!", session }
        };
        return redirect(redirectUnauthorized);
    } 

    if(legacyBehavior) return session
    return { authorized: true, error: false, message: "Success!", session };
};

/**
 * Checks if a user is authorized based on their role and returns a message accordingly.
 * @param {object} [options] - optional object that controls how this function should behave.
 * @param {string} [options.requiredRole] - string, the role the user should be to access this action.
 * @param {boolean} [options.exactMatch] - optional bool, default is `false`. Set to `true` to make sure the user role is an exact match on the given `requiredRole`.
 * @param {boolean} [options.inverse] - optional bool, default is `false`. Set to `true` to make sure the user role is BELOW the given `requiredRole`.
 * @returns {Promise<{ 
 *  authorized: boolean;
 *  error: "e_requiredRole" | "e_unauthorized" | "e_forbidden" | false;
 *  message: string;
 *  session: Session;
 * }>}
 */
export const actionProtection = async ( options={} ) => {
    const { requiredRole, allowFalsyRole, legacyBehavior } = { ...DEFAULT_OPTIONS, ...options };
    if(!requiredRole){
        if(allowFalsyRole) {
            const session = await getServerSession(authOptions);
            return { authorized: true, error: false, message: "Success!", session: session ?? true }
        };
        return { authorized: false, error:"e_requiredRole", message: "The required role was not given correctly!", session: null };
    }

    const session = await getServerSession(authOptions);

    if (!session){ 
        if(legacyBehavior) return { authorized: false, error:true, message: "Unauthorized!", session }
        return { authorized: false, error:"e_unauthorized", message: "Unauthorized!", session };
    }
    
    if (!checkRoleAccessLevel(session, requiredRole, options)) {
        if(legacyBehavior) return { authorized: false, error:true, message: "Forbidden!", session }
        return { authorized: false, error:"e_forbidden", message: "Forbidden!", session };
    }

    if(legacyBehavior) return { authorized: true, error:false, message: "Success!", session }
    return { authorized: true, error: false, message: "Success!", session };
};