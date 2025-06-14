
// Server ----------------------------------------------------------------------------
import { pageProtection } from "@/submodules/common-utils/lib/protector";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const PAGE_PROTECTION_OPTIONS = {
    requiredRole: "USER",
    redirectNotLoggedIn: "/signin?callbackUrl=%2F",
    redirectUnauthorized: "/",
    inverse: true
};



//______________________________________________________________________________________
// ===== Component =====

/**
 * This component is a component that can be used as a whole page for when a user is signed in but does not have the required role to access any of the pages.
 * @param {object} props
 * @param {object} [props.pageProtectionOptions] - optional object, overrides the default options for the page protection.
 * @returns {React.ReactNode}
 */
export default async function PageSignedInUserUnauthorized ({ pageProtectionOptions={} }) {

    //______________________________________________________________________________________
    // ===== Page Protector =====
    await pageProtection({ ...PAGE_PROTECTION_OPTIONS, ...pageProtectionOptions });

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="container mx-auto text-center">
            <h1>You are signed in</h1>
            <p>You do not have clarence to access this site.</p>
            <p>Please contact the site administrators.</p>
        </div>
    )
}