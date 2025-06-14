"use client"

// Packages -------------------------------------------------------------------------
import { useSearchParams } from "next/navigation";
// Components -----------------------------------------------------------------------
import ProviderButton from "./ProviderButton";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    shouldShowDevLoginIfDevelopmentMode: false,
};



//______________________________________________________________________________________
// ===== Component =====

/**
 * This component is a wrapper for the logic around signing in with NextAuth.
 * @param {object} props
 * @param {React.ReactNode} [props.children] - optional jsx, usually provider buttons or email sign in form
 * @param {object} [props.options] - optional object that controls how this component should behave.
 * @param {boolean} [props.options.shouldShowDevLoginIfDevelopmentMode] - optional bool, default is `false`. 
 * Set to `true` to show a google login button if the app is in development mode. This is useful for just
 * when the app has yet to be deployed to qa or production.
 * @returns {React.ReactNode}
 */
export default function SignInWrapper({ children, options={} }) {
    //______________________________________________________________________________________
    // ===== Options =====
    const { shouldShowDevLoginIfDevelopmentMode } = { ...DEFAULT_OPTIONS, ...options };

    //______________________________________________________________________________________
    // ===== Hooks =====
    const searchParams = useSearchParams();

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="p-8 flex flex-col w-full max-w-lg">
            {searchParams.get("error") === "OAuthAccountNotLinked" && <>
                <div className="p-4 bg-red-500 text-white">
                    <h3>Error Signing In</h3>
                    <p className="m-0">Try signing in with email.</p>
                </div>
                <hr/>
            </>}

            {children}

            {shouldShowDevLoginIfDevelopmentMode && process.env.NODE_ENV === "development" && <>
                <hr/>
                <ProviderButton provider="google" icon="faGoogle">Google</ProviderButton>
            </>}

        </div>
    );
};