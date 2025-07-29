

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { SidebarProvider } from "./shadcn/ui/sidebar";
import MicroClient from "./clients/MicroClient";
import { auth } from "@/server/auth";
import ConvexClientProvider from "./providers/ConvexProviderWithAuth";
// import ProviderForConvex from "./providers/ProviderForConvex";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    return (
        <ConvexClientProvider session={session}>
            <SidebarProvider>
                <MicroClient />
                {children}
            </SidebarProvider>
        </ConvexClientProvider>
    );
}