"use client";

// Packages -------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogInIcon, LogOutIcon } from "lucide-react";
// Components -----------------------------------------------------------------------
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar";
import SidebarMenuLink from "@/components/shadcn/sidebar/SidebarMenuLink";
import type { Session } from "@/types";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types =====

interface Options {
    /** optional bool, default is `false`. Defines the position of the sticky element. */
    stickyPosition?: false | "top" | "bottom" | "bottom-absolute";

    /** optional number, default is `80`. Defines the offset of the absolute position so that it doesn't overlap with the the other elements. */
    defaultAbsoluteOffset?: number;

    /** optional string, default is "authenticated". Determines whether the children should be displayed above or below the sidebar menu. */
    childrenAs?: "contentAbove" | "contentBelow" | "authenticated";
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS: Options = {
    stickyPosition: false,
    defaultAbsoluteOffset: 80,
    childrenAs: "authenticated",
};



//______________________________________________________________________________________
// ===== Pure Functions =====

const getStickyClassName = (stickyPosition: Options["stickyPosition"]) => {
    if (stickyPosition === "top")
        return "sticky top-0 left-0 z-1 w-full bg-sidebar";
    if (stickyPosition === "bottom")
        return "sticky bottom-0 left-0 z-1 w-full bg-sidebar";
    if (stickyPosition === "bottom-absolute")
        return "absolute bottom-0 left-0 z-1 w-full bg-sidebar";
    return "";
};



//______________________________________________________________________________________
// ===== Component =====

export default function AuthSidebarGroup({
    children,
    otherChildren={},
    options={},
}: {
    children?: React.ReactNode;
    otherChildren?: {
        contentAbove?: React.ReactNode;
        contentBelow?: React.ReactNode;
        authenticated?: React.ReactNode;
    };
    options?: Options;
}){

    //______________________________________________________________________________________
    // ===== Options =====
    const { stickyPosition, defaultAbsoluteOffset, childrenAs } = { ...DEFAULT_OPTIONS, ...options };



    //______________________________________________________________________________________
    // ===== References =====
    const ref = useRef<HTMLDivElement>(null);



    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data: dataSession, status } = useSession();
    const session = dataSession as Session;

    useEffect(() => {
        console.log({ trace: "AuthSidebarGroup useEffect", dataSession, status });
    }, [status])


    //______________________________________________________________________________________
    // ===== State =====
    const [absoluteOffset, setAbsoluteOffset] = useState(defaultAbsoluteOffset);



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if (stickyPosition !== "bottom-absolute") return;
        setAbsoluteOffset(ref?.current?.clientHeight);
    }, [ref?.current?.clientHeight, stickyPosition]);



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        {stickyPosition === "bottom-absolute" && (
            <div
                className="w-full"
                style={{ minHeight: `${absoluteOffset || 0}px` }}
            />
        )}
        <div className={getStickyClassName(stickyPosition)} ref={ref}>
            <SidebarGroup className="relative">
                {/* <SidebarGroupLabel>{session?.user?.email || ` `}</SidebarGroupLabel> */}
                {session?.user?.username && (
                    <SidebarGroupLabel>
                        {session.user.username}
                    </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                    <SidebarMenu>
                        {childrenAs === "contentAbove" && children ? children : otherChildren?.contentAbove}
                        {status === "loading" && (
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => {}}>
                                    <Skeleton className="h-[20px] w-full rounded-full" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        {status === "unauthenticated" && (
                            <SidebarMenuLink href="/signin">
                                <LogInIcon />
                                <span>Login</span>
                            </SidebarMenuLink>
                        )}
                        {status === "authenticated" && <>
                            {childrenAs === "authenticated" && children ? children : otherChildren?.authenticated}
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={()=>signOut()}>
                                    <LogOutIcon />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </>}
                        {childrenAs === "contentBelow" && children ? children : otherChildren?.contentBelow}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </div>
    </>
}
