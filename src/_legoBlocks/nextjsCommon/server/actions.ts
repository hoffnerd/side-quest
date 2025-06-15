
import "server-only";

// Types ----------------------------------------------------------------------------
import type { OptionsActionProtection } from "@/server/protector";
// Server ---------------------------------------------------------------------------
import { actionProtection } from "@/server/protector";
// Data -----------------------------------------------------------------------------
import { PROJECT_USER_ROLE_STANDARD_ALLOWED } from "@/data/_config";
import type { Session } from "@/types";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== Interfaces =====

interface Options extends OptionsActionProtection {
    trace?: string;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    trace: "serverAction",
    allowedRoles: PROJECT_USER_ROLE_STANDARD_ALLOWED,
}



//______________________________________________________________________________________
// ===== Functions =====

const handleError = ({ trace, message, session }: { trace: string, message: string, session: Session | null }) => {
    console.error({ trace, message, session });
    return { error: true, message };
}

/**
 * Handles server-side actions with optional role-based protection and error handling.
 * - NOTE: Do not not use this if your server action needs to do a redirect. Redirects count as a 301 error
 * code, which will be caught within the try/catch block and will return an error to you.
 * @param callback - async function, will be executed within the try/catch block of this function.
 * @param options - optional object that changes the behavior of this function. 
 * Can contain the following properties:
 * @param options.trace - optional string, default is "serverAction". Can be anything that helps
 * the dev know where the server action was called. Recommend to just be the function name of the server 
 * action the dev is creating.
 */
export const serverAction = async <T> (
    callback: ( props: { session: Session; options: Options; } ) => Promise<any>, 
    options: Options = {}
): Promise<{ error: boolean; message?: string; data?: T;}> => {

    // get any options, defaulted or passed in
    const optionsToUse = { ...DEFAULT_OPTIONS, ...options }
    const { trace, allowedRoles } = optionsToUse;

    const { error, message, session } = await actionProtection({ allowedRoles });
    if(error) return handleError({ trace, message, session });
    if(!session) return handleError({ trace, message: "Error: No session!", session });

    try {
        // try to run the given `callback` function, gracefully fails if any errors are thrown
        const data = await callback({ session, options: optionsToUse });

        // send back the data in a normalized way
        return { error: false, message: "Success!", data };
    } catch (e: any) {
        return handleError({ trace, message: e?.message || "Unknown Error!", session });
    }
}