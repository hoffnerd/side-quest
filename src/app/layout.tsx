
// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { type Metadata } from "next";
import { Geist } from "next/font/google";
// Data -----------------------------------------------------------------------------
import { PROJECT_DESCRIPTION, PROJECT_SIDEBAR_OPTIONS, PROJECT_TITLE } from "@/data/_config";
// Stores ---------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import Providers from "@/components/Providers";
import SidebarWithTrigger from "@/components/shadcn/sidebar/SidebarWithTrigger";
import ProjectSidebar from "@/components/ProjectSidebar";
// Other ----------------------------------------------------------------------------
import "@/styles/globals.css";



//______________________________________________________________________________________
// ===== Constants =====

export const metadata: Metadata = {
    title: PROJECT_TITLE,
    description: PROJECT_DESCRIPTION,
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});



//______________________________________________________________________________________
// ===== Component =====

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable} dark`}>
            <body>
                <Providers>
                    <SidebarWithTrigger options={PROJECT_SIDEBAR_OPTIONS}>
                        <ProjectSidebar />
                    </SidebarWithTrigger>
                    <main className="w-full">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}

