
// Types ---------------------------------------------------------------------------
// Server --------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// Components ----------------------------------------------------------------------
// Data ----------------------------------------------------------------------------
import { PROJECT_TITLE } from "@/data/_config";
import ProviderButton from "@/components/auth/ProviderButton";
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Metadata =====

export const metadata = {
    title: `Sign In | ${PROJECT_TITLE}`, 
    description: `Sign In to ${PROJECT_TITLE}`
};



//______________________________________________________________________________________
// ===== Component =====

export default async function Page ({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    //______________________________________________________________________________________
    // ===== Search Parameters =====
    const error = (await searchParams).error;

    //______________________________________________________________________________________
    // ===== Page Protector =====
    await pageProtection({
        redirectForbidden: "/signedin",
        shouldOnlyAllowUnauthorized: true,
    });

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="flex flex-col items-center pb-8 w-full h-full">
            <div className="h-20 md:h-[15rem]" />
            <div className="p-8 flex flex-col w-full max-w-lg">
                <h1 className="text-3xl font-extrabold text-center pb-4">Sign In</h1>

                {error === "OAuthAccountNotLinked" && <>
                    <div className="p-4 bg-red-500 text-white">
                        <h3>Error Signing In</h3>
                        <p className="m-0">Try signing in with email.</p>
                    </div>
                    <hr/>
                </>}

                <ProviderButton provider="google">Google</ProviderButton>

            </div>
        </div>
    )
};