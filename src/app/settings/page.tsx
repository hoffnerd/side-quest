
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
    // ===== Search Parameters =====
    const err = (await searchParams).error;
    const hasUsernameError = err === "no-username";



    //______________________________________________________________________________________
    // ===== Page Protector =====
    const { error, message, session } = await pageProtectionCore();


    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <PageWrapper>
            <div className="container mx-auto">
                <h1 className="text-3xl font-extrabold pb-4">Settings</h1>

                {(hasUsernameError || error) && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircleIcon />
                        {(!hasUsernameError) &&<AlertTitle>Error!</AlertTitle>}
                        <AlertDescription>
                            {hasUsernameError && <p>Please enter a username.</p>}
                            {error && <p>{message ?? "An unknown error occurred."}</p>}
                        </AlertDescription>
                    </Alert>
                )}

                <Form action={updateSettings}>
                    <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        defaultValue={session?.user?.username ?? ""}
                        required
                    />
                    <Button type="submit">Save</Button>
                </Form>
            </div>
        </PageWrapper>
    )
}