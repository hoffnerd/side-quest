

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { SessionProvider } from "next-auth/react"
// Data -----------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { SidebarProvider } from "./shadcn/ui/sidebar";
import MicroClient from "./clients/MicroClient";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SessionProvider>
            <SidebarProvider>
                <MicroClient />
                {children}
            </SidebarProvider>
        </SessionProvider>
    );
}