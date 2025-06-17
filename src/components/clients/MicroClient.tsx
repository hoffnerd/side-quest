"use client";


// Packages -------------------------------------------------------------------------
import { useEffect } from "react";
// Stores----------------------------------------------------------------------------
import { useProjectStore } from "@/stores/useProjectStore";
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { THEMES } from "@/data/_config";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function MicroClient() {

    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useProjectStore((state) => state.setStoreKeyValuePair);
    const theme = useProjectStore((state) => state.theme);



    //______________________________________________________________________________________
    // ===== Use Effects for Theme =====

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        console.log({ trace: "MicroClient useEffect", theme, localTheme });
        if(!localTheme) return;
        if(localTheme === theme) return;
        if(!Object.keys(THEMES).includes(localTheme)) return;
        setStoreKeyValuePair({ theme: localTheme as keyof typeof THEMES });
    }, []);
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    return <></>
}
