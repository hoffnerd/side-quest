
import type { User } from "@prisma/client";
import type { Session as SessionNA } from "next-auth";
import type { THEMES } from "./data/_config";



//______________________________________________________________________________________
// ===== User & Session =====

export interface Session extends Omit<SessionNA, "user">{
    user: User;
}



//______________________________________________________________________________________
// ===== Stores =====

type Theme = keyof typeof THEMES;

export interface ProjectStoreStateOptional {
    theme?: Theme;
}

export interface ProjectStoreState {
    theme: Theme;
}

export interface ProjectStoreFunctions {
    setStoreKeyValuePair: (obj: ProjectStoreStateOptional) => void;
}



//______________________________________________________________________________________
// =====  =====