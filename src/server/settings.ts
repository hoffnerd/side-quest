"use server";

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Server ---------------------------------------------------------------------------
import { db } from "./db";
import { serverAction } from "@/_legoBlocks/nextjsCommon/server/actions";
import { profanityCheck } from "@/util/profanityCheck";
// Data -----------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types =====

interface UpdateSettingsProps {
    username: string;
}



//______________________________________________________________________________________
// ===== True Constants =====



//______________________________________________________________________________________
// ===== Actions =====

export const updateSettings = async (data: UpdateSettingsProps) => {
    if(!data?.username) return { error: true, message: "Username is required.", data: { errorLocation: "username" } };
    if(profanityCheck(data.username)) return { error: true, message: "Username may not contain profanity.", data: { errorLocation: "username" } }; 

    const { error, message } = await serverAction<Boolean>(async ({ session }) => {
        const matchedUsername = await db.user.findMany({
            select: { username: true },
            where: { 
                username: {
                    equals: data.username,
                    mode: "insensitive",
                },
                NOT: [ { username: session.user.username } ]
            }
        });
        if(matchedUsername.length > 0) throw new Error("usernameTaken");

        await db.user.update({ 
            where: { id: session.user.id },
            data: { username: data.username },
        });
        revalidatePath("/settings");
        return true;
    }, { trace: "updateSettings" });

    // if(!error) redirect("/settings");
    if(!error) return { error: false, message: "Successfully updated settings." };

    switch(message) {
        case "usernameTaken": return { error: true, message: "Username already taken.", data: { errorLocation: "username" } };
        default: return { error: true, message: "An unknown error occurred." };
    }
}
