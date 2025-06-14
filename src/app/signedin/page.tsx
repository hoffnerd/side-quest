
// Types ---------------------------------------------------------------------------
// Server --------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// Components ----------------------------------------------------------------------
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------






export default async function Page() {

    //______________________________________________________________________________________
    // ===== Page Protector =====
    await pageProtection();

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div className="container mx-auto text-center">
            <h1 className="text-5xl font-extrabold">You are signed in</h1>
            {/* <p>You do not have clarence to access this site.</p>
            <p>Please contact the site administrators.</p> */}
        </div>
    )
}