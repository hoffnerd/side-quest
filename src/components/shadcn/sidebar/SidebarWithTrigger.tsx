

// Packages -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { Sidebar, SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import SidebarTriggerCustom from "./SidebarTriggerCustom";
// Other ----------------------------------------------------------------------------
import { cn } from "@/lib/shadcn";



//______________________________________________________________________________________
// ===== Types =====

interface Options {
    /** optional object, default is `{}`. Defines the props to pass to the sidebar trigger button. */
    sidebarTriggerButtonProps?: any;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS: Options = {
    sidebarTriggerButtonProps: {},
}



//______________________________________________________________________________________
// ===== Component =====

export default function SidebarWithTrigger({ children, options={} }: { children?: React.ReactNode, options?: Options }) {
    
    //______________________________________________________________________________________
    // ===== Options =====
    const { sidebarTriggerButtonProps } = { ...DEFAULT_OPTIONS, ...options };
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <Sidebar>
            {children}
        </Sidebar>
        <SidebarTriggerCustom {...sidebarTriggerButtonProps} />
    </>
}
