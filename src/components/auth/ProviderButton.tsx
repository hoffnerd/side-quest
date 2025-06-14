"use client"

// Packages -------------------------------------------------------------------------
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "../shadcn/ui/button";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function ProviderButton({
    children,
    className,
    provider,
    email = null,
}: {
    children: React.ReactNode;
    className?: string;
    provider: string;
    email?: string | null;
}){

    //______________________________________________________________________________________
    // ===== Search Params =====
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";



    //______________________________________________________________________________________
    // ===== State ===== 
    const [variant, setVariant] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);



    //______________________________________________________________________________________
    // ===== Handler Functions =====

    const handleSignIn = async () => {
        setVariant(null);
        setMessage(null);

        // If we are signing in with a provider other than email, let the provider handle it
        if (email === null) return signIn(provider, {callbackUrl})

        // If we are signing in with the email provider, handle errors
        const res = await signIn(provider, { redirect: false, callbackUrl, email });
        if(!res?.error) return setMessage("Check your email for a sign-in link.");
        
        setVariant("error");
        setMessage("You may have entered an incorrect email address.");
    };



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <Button className={className} onClick={handleSignIn}>
            {children}
        </Button>
        {message && <p className={variant === "error" ? "red-500" : ""}>{message}</p>}
    </>
}