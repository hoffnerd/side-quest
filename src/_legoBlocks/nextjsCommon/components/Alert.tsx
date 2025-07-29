

// Types ----------------------------------------------------------------------------
import type { VariantProps } from "class-variance-authority"
// Packages -------------------------------------------------------------------------
import { AlertCircleIcon } from "lucide-react";
// Stores----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { Alert as AlertShadcn, AlertDescription, AlertTitle, alertVariants } from "@/components/shadcn/ui/alert";
import { cn } from "@/lib/shadcn";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Type Definitions =====

interface AlertPresets {
    error: {
        variant: "destructive",
        title: "Error!",
        description: "An unknown error occurred!",
    }
}

interface AlertOptions {
}



//______________________________________________________________________________________
// ===== True Constants =====

const ALERT_PRESETS: AlertPresets = {
    error: {
        variant: "destructive",
        title: "Error!",
        description: "An unknown error occurred!",
    },
}



//______________________________________________________________________________________
// ===== Component =====

export function Alert({ 
    children,
    className,
    variant,
    title,
    preset="error",
}: Readonly<{ 
    children?: React.ReactNode,
    className?: React.ComponentProps<"div">["className"],
    variant?: VariantProps<typeof alertVariants>["variant"],
    title?: string,
    preset?: "error"; //  | "success" | "warning" | "info"
}>) {
    return (
        <AlertShadcn variant={variant ?? ALERT_PRESETS[preset].variant} className={cn("mb-4 -mt-4", className)}>
            <AlertCircleIcon />
            <AlertTitle>{title ?? ALERT_PRESETS[preset].title}</AlertTitle>
            <AlertDescription>{children ?? ALERT_PRESETS[preset].description}</AlertDescription>
        </AlertShadcn>
    )
}