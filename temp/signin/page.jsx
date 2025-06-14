
// Server ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import PageSignIn from "@/submodules/auth-nextauth-prisma/pages/PageSignIn";
// Data ----------------------------------------------------------------------------
import { PROJECT_NAME } from "@/data/_configProject";
// Other ----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== Metadata =====

export const metadata = {
    title: `Sign In | ${PROJECT_NAME}`, 
    description: "Sign In to the application"
};



//______________________________________________________________________________________
// ===== Component =====

export default async function Page () {

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <PageSignIn options={{ shouldShowDevLoginIfDevelopmentMode: true }} />
};