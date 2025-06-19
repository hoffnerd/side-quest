"use client";

// Types ----------------------------------------------------------------------------
import type { Session } from "@/types";
// Packages -------------------------------------------------------------------------
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// Stores----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Hook =====

export default function useRouteKickBack(kickBackRoute: string, routesToKickBackOn: Array<string>) {

    //______________________________________________________________________________________
    // ===== Session =====
    const { data: dataSession, status } = useSession();
    const session = dataSession as Session;

    //______________________________________________________________________________________
    // ===== Hooks =====
    const router = useRouter();
    const pathname = usePathname();

    //______________________________________________________________________________________
    // ===== State =====
    const [initialPathname, setInitialPathname] = useState<string | null>(null);
    const [hasKickedBack, setHasKickedBack] = useState(false);


    //______________________________________________________________________________________
    // ===== Use Effects for Theme =====

    useEffect(() => {
        console.log({ trace: "useRouteKickBack useEffect", pathname });
        if(initialPathname) return;
        setInitialPathname(pathname);
    }, [pathname]);

    useEffect(() => {
        if(hasKickedBack) return;
        if(!initialPathname) return;
        if(initialPathname !== pathname) return;
        if(status !== "authenticated") return;
        if(!session.user.username) return;
        if(!routesToKickBackOn.includes(pathname)) return;
        setHasKickedBack(true);
        router.push(kickBackRoute);
    }, [initialPathname, pathname, hasKickedBack, session, status, routesToKickBackOn, kickBackRoute]);    


    //______________________________________________________________________________________
    // ===== Hook Return =====
    return hasKickedBack;
}
