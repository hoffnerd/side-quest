"use client";

// Packages -------------------------------------------------------------------------
import { usePathname } from "next/navigation";
// Components -----------------------------------------------------------------------
import { SidebarTrigger as SidebarTriggerOriginal } from "@/components/shadcn/ui/sidebar";
import { Button } from "@/components/shadcn/ui/button";
// Other ----------------------------------------------------------------------------
import { cn } from "@/lib/shadcn";



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    customPropsBasedOnPathname: {},
}



//______________________________________________________________________________________
// ===== Micro-Components =====

function SidebarTrigger (props: React.ComponentProps<typeof Button>){
    return (
        <SidebarTriggerOriginal
            variant={props?.variant ?? "ghost"}
            className={cn("sticky top-0 left-0 z-10", props?.className)} 
        />
    )
}



//______________________________________________________________________________________
// ===== Component =====

export default function SidebarTriggerCustom({ options={}, ...props }) {
    
    //______________________________________________________________________________________
    // ===== Options =====
    const { customPropsBasedOnPathname } = { ...DEFAULT_OPTIONS, ...options };
    


    //______________________________________________________________________________________
    // ===== Hooks =====
    const pathname = usePathname();



    //______________________________________________________________________________________
    // ===== Constants =====

    // @ts-ignore
    const propsToUse = pathname && customPropsBasedOnPathname?.[pathname] ? { ...props, ...customPropsBasedOnPathname[pathname] } : props;
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    if(propsToUse?.classNames?.div) return (
        <div className={cn(propsToUse?.classNames?.div)}>
            <SidebarTrigger {...propsToUse} />
        </div>
    )
    return <SidebarTrigger {...propsToUse} />
}
