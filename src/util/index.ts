

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


/**
 * Converts any string to camelCase format.
 * @param str - string in camelCase format that you want to convert to title case.
 */
export const toCamelCase = (str: string) => {
    return str
        // Step 1: Fix ALL CAPS Prefixes (e.g., "IMAGEFile" → "ImageFile")
        .replace(/^[A-Z]+(?=[A-Z][a-z])/g, (match) => match[0] + match.slice(1).toLowerCase())

        // Step 2: Convert PascalCase to snake_case (inserting underscores)
        .replace(/([a-z])([A-Z])/g, "$1_$2")

        // Step 3: Replace all separators (spaces, periods, dashes) with underscores
        .replace(/[\s.\-]+/g, "_")

        // Step 4: Split by underscores, filter empty parts, and convert to camelCase
        .split("_")
        .filter(Boolean)
        .map((word, index) => index === 0 ? word.toLowerCase() : (word[0] ?? "").toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}


/**
 * Converts a camelCase string to a title case string.
 * @param camelCase - string in camelCase format that you want to convert to title case.
 */
export const camelToTitle = (camelCase: string) => {
    return camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
}

/**
 *  Match items in two arrays. Returns an array of items that are NOT in both arrays.
 * @param array1 - an array of to be compared.
 * @param array2 - an array of to be compared.
 */
export const matchArrays = (array1: Array<any>, array2: Array<any>) => {
    const array1Items = array1.filter((item) => !array2.includes(item));
    const array2Items = array2.filter((item) => !array1.includes(item));
    const result = [ ...new Set([...array1Items, ...array2Items]) ];
    console.log({ trace: "matchArrays", array1, array2, array1Items, array2Items, result });
    return result;
}