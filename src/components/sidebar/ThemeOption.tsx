"use client";

// Types ----------------------------------------------------------------------------
import type { THEMES } from "@/data/_config";
// Packages -------------------------------------------------------------------------
import { CheckIcon } from "lucide-react";
// Stores ---------------------------------------------------------------------------
import { useProjectStore } from "@/stores/useProjectStore";
// Components -----------------------------------------------------------------------
import { DropdownMenuItem } from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function ThemeOption({ themeKey, themeObj }: { themeKey: keyof typeof THEMES, themeObj: typeof THEMES[keyof typeof THEMES] }) {

    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useProjectStore((state) => state.setStoreKeyValuePair);
    const theme = useProjectStore((state) => state.theme);



    //______________________________________________________________________________________
    // ===== Functions =====

    const setTheme = () => {
        localStorage.setItem("theme", themeKey);
        setStoreKeyValuePair({ theme: themeKey });
    }



    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <DropdownMenuItem asChild>
            <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => setTheme()}
            >
                {/* <CheckIcon className={`${theme === themeKey ? "" : "hidden"} h-5 w-5`} /> */}
                {theme === themeKey ? <CheckIcon /> : <div className="h-5 w-5" />}
                {themeObj?.display ?? themeKey}
            </Button>
        </DropdownMenuItem>
    )
}
