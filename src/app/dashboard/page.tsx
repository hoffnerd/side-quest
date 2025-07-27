
// Types ---------------------------------------------------------------------------
// Packages ------------------------------------------------------------------------
// Server --------------------------------------------------------------------------
// Components ----------------------------------------------------------------------
import DeckviewDemo from "@/components/DeckviewDemo";
import PageWrapper from "@/components/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
 
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <PageWrapper className="py-4 @container">
            <DeckviewDemo />
            {/* <div className="grid gap-4 grid-cols-1 @4xl:grid-cols-5 @6xl:grid-cols-4">
                
                <div className="col-span-1 @4xl:col-span-2 @6xl:col-span-1">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1 @4xl:col-span-3">
                    
                </div>
            </div> */}
        </PageWrapper>
    )
}