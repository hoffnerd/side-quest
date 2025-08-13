
// Types ---------------------------------------------------------------------------
// Packages ------------------------------------------------------------------------
import { redirect } from "next/navigation";
import { AlertCircleIcon } from "lucide-react";
// Server --------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// Components ----------------------------------------------------------------------
import PageWrapper from "@/components/PageWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import SettingsForm from "@/components/SettingsForm";
import { fetchQuery } from "convex/nextjs";
import { api } from "convex/_generated/api";
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    //______________________________________________________________________________________
    // ===== Page Protector =====
    const pageProtectionResponse = await pageProtection({ 
        redirectUnauthorized: "/signin?callbackUrl=%2Fsettings" 
    });



    //______________________________________________________________________________________
    // ===== Page Protector =====
    const { error, message, data } = await fetchQuery(api.userProfile.readUserProfile);


    
    //______________________________________________________________________________________
    // ===== Search Parameters =====
    const err = (await searchParams).error;
    const hasUrlUsernameError = err === "no-username" && (data?.username ? false : true);


    
    //______________________________________________________________________________________
    // ===== Component Return =====
    // if(err === "no-username" && data?.username) return redirect("/dashboard");
    return (
        <PageWrapper>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="pb-16"/>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(hasUrlUsernameError || error) && (
                            <Alert variant="destructive" className="mb-4 -mt-4">
                                <AlertCircleIcon />
                                {(!hasUrlUsernameError) && <AlertTitle>Error!</AlertTitle>}
                                <AlertDescription>
                                    {hasUrlUsernameError && <p>Please enter a username.</p>}
                                    {error && <p>{message ?? "An unknown error occurred."}</p>}
                                </AlertDescription>
                            </Alert>
                        )}
                        <SettingsForm/>
                    </CardContent>
                </Card>

            </div>
        </PageWrapper>
    )
}