
// Server ----------------------------------------------------------------------------
import { pageProtection } from "@/submodules/common-utils/lib/protector";
// Components -----------------------------------------------------------------------
import SignInWrapper from "../components/SignInWrapper";
// Data ----------------------------------------------------------------------------
import { PROJECT_NAME } from "@/data/_configProject";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const PAGE_PROTECTION_OPTIONS = {
    requiredRole: "UNAUTHORIZED",
    redirectNotLoggedIn: false,
    redirectUnauthorized: "/signedin",
    inverse: true
};

const DEFAULT_OPTIONS = {
    shouldShowDevLoginIfDevelopmentMode: false,
};



//______________________________________________________________________________________
// ===== Metadata =====

export const metadata = {
    title: `Sign In | ${PROJECT_NAME}`, 
    description: "Sign In to the application"
};



//______________________________________________________________________________________
// ===== Component =====

/**
 * This component is a component that can be used as a whole page for signing in with NextAuth.
 * @param {object} props
 * @param {React.ReactNode} [props.children] - optional jsx, usually provider buttons or email sign in form
 * @param {object} [props.pageProtectionOptions] - optional object, overrides the default options for the page protection.
 * @param {object} [props.options] - optional object that controls how this component should behave.
 * @param {boolean} [props.options.shouldShowDevLoginIfDevelopmentMode] - optional bool, default is `false`. 
 * Set to `true` to show a google login button if the app is in development mode. This is useful for just
 * when the app has yet to be deployed to qa or production.
 * @returns {React.ReactNode}
 */
export default async function PageSignIn ({ children, pageProtectionOptions={}, options={} }) {

    //______________________________________________________________________________________
    // ===== Page Protector =====
    await pageProtection({ ...PAGE_PROTECTION_OPTIONS, ...pageProtectionOptions });

    //______________________________________________________________________________________
    // ===== Options =====
    const { shouldShowDevLoginIfDevelopmentMode } = { ...DEFAULT_OPTIONS, ...options };


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="flex flex-col items-center pb-8 w-full h-full">
            <div className="h-20 md:h-[15rem]" />
            <SignInWrapper options={{ shouldShowDevLoginIfDevelopmentMode }}>
                {children}
            </SignInWrapper>
        </div>
    );
};