

// Types ---------------------------------------------------------------------------
// Packages ------------------------------------------------------------------------
// Server --------------------------------------------------------------------------
// Components ----------------------------------------------------------------------
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Interfaces =====

interface Options {
    trace?: string;
}

//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS = {
    trace: "serverAction",
}

//______________________________________________________________________________________
// ===== Functions =====

const handleError = ({ trace, message }: { trace: string, message: string }) => {
    console.error({ trace, message });
    return { error: true, message, data: undefined };
}

export const convexSafety = async <T> (
    callback: ( props: { options: Options; } ) => Promise<T>, 
    options: Options = {}
) => {

    // get any options, defaulted or passed in
    const optionsToUse = { ...DEFAULT_OPTIONS, ...options }
    const { trace } = optionsToUse;

    try {
        // try to run the given `callback` function, gracefully fails if any errors are thrown
        const data = await callback({ options: optionsToUse });

        // send back the data in a normalized way
        return { error: false, message: "Success!", data };
    } catch (e: any) {
        return handleError({ trace, message: e?.message || "Unknown Error!" });
    }
}