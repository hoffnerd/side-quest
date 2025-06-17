"use client";


// Packages -------------------------------------------------------------------------
// Stores----------------------------------------------------------------------------
import { useProjectStore } from "@/stores/useProjectStore";
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { THEMES } from "@/data/_config";
import { useEffect } from "react";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Body({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {

    //______________________________________________________________________________________
    // ===== Stores =====
    const theme = useProjectStore((state) => state.theme);
    
    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        console.log({ trace: "Body useEffect", theme });
    }, [theme])

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <body className={`${className} ${THEMES?.[theme]?.bodyClassName}`}>
            {children}
        </body>
    )
}
