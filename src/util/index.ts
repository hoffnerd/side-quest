

// Types ----------------------------------------------------------------------------
import type { Session } from "@/types";
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { PROJECT_USER_ROLE_STANDARD_ALLOWED, PROJECT_USER_ROLES } from "@/data/_config";
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types =====




//______________________________________________________________________________________
// ===== True Constants =====




//______________________________________________________________________________________
// ===== Functions =====

export const checkAllowedRoles = (session?: Session | null, allowedRoles?: Array<keyof typeof PROJECT_USER_ROLES>) => {
    const allowedRolesToUse = allowedRoles ?? PROJECT_USER_ROLE_STANDARD_ALLOWED;
    const userRole = session?.user?.role ? session.user.role : "UNAUTHORIZED"; 
    return allowedRolesToUse.includes(userRole);
}