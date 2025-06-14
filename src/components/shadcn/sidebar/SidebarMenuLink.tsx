

// Packages -------------------------------------------------------------------------
import Link from "next/link";
// Components -----------------------------------------------------------------------
import { SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function SidebarMenuLink({ children, href }: { children?: React.ReactNode, href: string }) {
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href={href}>{children}</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
