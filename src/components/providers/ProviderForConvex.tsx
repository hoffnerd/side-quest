"use client";

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { ConvexProvider, ConvexReactClient } from "convex/react";
// Data -----------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


//______________________________________________________________________________________
// ===== Component =====

export default function ProviderForConvex({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    );
}