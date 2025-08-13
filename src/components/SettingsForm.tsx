"use client";

// Types ---------------------------------------------------------------------------
import type { Session } from "@/types";
// Packages ------------------------------------------------------------------------
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod/v4";
// Server --------------------------------------------------------------------------
import { updateSettings } from "@/server/settings";
// Components ----------------------------------------------------------------------
import InputOutputForm from "@/_legoBlocks/input-output-form/components/InputOutputForm";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Alert } from "@/_legoBlocks/nextjsCommon/components/Alert";
import { AlertCircleIcon } from "lucide-react";
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Zod Schema =====

const zodSchema = z.object({
    username: z.string()
        .min(2, { message: "Username must be at least 2 characters.", })
        .max(15, { message: "Username can only be at most 15 characters.", })
        .regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers.", }),
});



//______________________________________________________________________________________
// ===== Component =====

export default function SettingsForm() {
    //______________________________________________________________________________________
    // ===== Hooks =====
    const userProfileResponse = useQuery(api.userProfile.readUserProfile);
    const updateUserProfile = useMutation(api.userProfile.updateUserProfile);

    //______________________________________________________________________________________
    // ===== Component Return =====
    if(!userProfileResponse) return <div>Loading...</div>;
    if(userProfileResponse.error) return <Alert>{userProfileResponse.message}</Alert>;
    return (
        <InputOutputForm
            zodSchema={zodSchema}
            fieldDetails={{
                username: {
                    label: "Username",
                    description: "This is your public display name.",
                    defaultValue: userProfileResponse?.data?.username ?? "",
                },
            }}
            onSubmitServer={updateUserProfile}
            onSubmitClient={({ error }: Awaited<ReturnType<typeof updateSettings>>) => {
                if(error) return;
                // router.refresh(); // Only refreshes the page, not the entire app.
                window.location.reload(); // Refreshes the entire app, allowing for the new username to be used.
            }}
        />
    )
}