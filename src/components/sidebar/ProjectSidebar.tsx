

// Packages -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------

import Link from "next/link";
import AuthSidebarGroup from "../shadcn/sidebar/AuthSidebarGroup";
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "../shadcn/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../shadcn/ui/dropdown-menu";
import { ArrowRightIcon, CogIcon } from "lucide-react";
import { THEMES } from "@/data/_config";
import ThemeOption from "./ThemeOption";



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
            <AuthSidebarGroup options={{ childrenAs: "contentAbove" }}>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <CogIcon />
                                <span>Settings</span>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-60">
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {Object.entries(THEMES).map(([themeKey, themeObj]) => (
                                            <ThemeOption key={themeKey} themeKey={themeKey as keyof typeof THEMES} themeObj={themeObj} />
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuItem asChild>
                                <Link href="/settings">More Settings</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </AuthSidebarGroup>
        </SidebarFooter>
    </>
}
