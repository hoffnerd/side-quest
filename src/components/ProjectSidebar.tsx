

// Packages -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------

import Link from "next/link";
import AuthSidebarGroup from "./shadcn/sidebar/AuthSidebarGroup";
import { SidebarContent, SidebarFooter, SidebarHeader } from "./shadcn/ui/sidebar";



//______________________________________________________________________________________
// ===== Component =====

export default function ProjectSidebar() {
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <SidebarHeader>
            <Link className="text-xl font-bold text-center hover:underline focus:underline" href="/">
                Side Quest
            </Link>
        </SidebarHeader>

        <SidebarContent>
        </SidebarContent>

        <SidebarFooter>
            <AuthSidebarGroup/>
        </SidebarFooter>
    </>
}
