"use client"

// Packages -------------------------------------------------------------------------
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

/**
 * This component is a button that allows a user to sign in with a provider.
 * @param {object} props
 * @param {React.ReactNode} props.children - jsx, usually the provider's readable name.
 * @param {string} [props.className] - optional string, the class name to apply to the button.
 * @param {string} props.provider - string, the provider to sign in with. Must be one of the providers defined in the `authOptions` file.
 * @param {string} [props.email] - optional string, the email address to sign in with. If not given, will not use email provider sign in logic.
 * @returns {React.ReactNode}
 */
export default function ProviderButton({ children, className, provider, email=null }){

    //______________________________________________________________________________________
    // ===== Search Params =====
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";



    //______________________________________________________________________________________
    // ===== State ===== 
    const [variant, setVariant] = useState(null);
    const [message, setMessage] = useState(null);



    //______________________________________________________________________________________
    // ===== Handler Functions =====

    const handleSignIn = async () => {
        setVariant(null);
        setMessage(null);

        // If we are signing in with a provider other than email, let the provider handle it
        if (email === null) return signIn(provider, {callbackUrl})

        // If we are signing in with the email provider, handle errors
        const res = await signIn(provider, { redirect: false, callbackUrl, email });
        if(!res.error) return setMessage("Check your email for a sign-in link.");
        
        setVariant("error");
        setMessage("You may have entered an incorrect email address.");
    };



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <button 
            className={`p-4 rounded-lg my-2 text-2xl ease-out duration-300 bg-[#18453B] text-white hover:bg-white hover:text-[#18453B] focus:bg-white focus:text-[#18453B] ${className}`} 
            onClick={handleSignIn}
        >
            {children}
        </button>
        {message && <p className={variant === "error" ? "red-500" : ""}>{message}</p>}
    </>
}