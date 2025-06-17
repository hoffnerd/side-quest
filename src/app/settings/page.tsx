
// Types ---------------------------------------------------------------------------
// Packages ------------------------------------------------------------------------
import Form from "next/form";
// Server --------------------------------------------------------------------------
import { pageProtectionCore } from "@/server/protector";
// Components ----------------------------------------------------------------------
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { updateSettings } from "@/server/settings";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import SettingsForm from "@/components/SettingsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
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
    const { error, message, session } = await pageProtectionCore();


    
    //______________________________________________________________________________________
    // ===== Search Parameters =====
    const err = (await searchParams).error;
    const hasUsernameError = err === "no-username" && (session?.user?.username ? false : true);


    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <PageWrapper>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="pb-16"/>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {(hasUsernameError || error) && (
                            <Alert variant="destructive" className="mb-4 -mt-4">
                                <AlertCircleIcon />
                                {(!hasUsernameError) &&<AlertTitle>Error!</AlertTitle>}
                                <AlertDescription>
                                    {hasUsernameError && <p>Please enter a username.</p>}
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