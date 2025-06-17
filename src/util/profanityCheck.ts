
// Types ---------------------------------------------------------------------------
// Packages ------------------------------------------------------------------------
import { array as profanityList } from "badwords-list";
// Server --------------------------------------------------------------------------
// Components ----------------------------------------------------------------------
import { toCamelCase } from ".";
// Data ----------------------------------------------------------------------------
// Other ---------------------------------------------------------------------------



export const profanityCheck = (text: string) => {
    const parsedText = toCamelCase(text).toLowerCase();
    let isProfane = false;
    for (const word of profanityList) {
        const parsedWord = toCamelCase(word).toLowerCase();
        if (text.includes(word) || text.includes(parsedWord) || parsedText.includes(word) || parsedText.includes(parsedWord)) {
            isProfane = true;
            break;
        }
    }
    return isProfane;
}