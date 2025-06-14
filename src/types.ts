
import type { User } from "@prisma/client";
import type { Session as SessionNA } from "next-auth";



//______________________________________________________________________________________
// ===== User & Session =====

export interface Session extends Omit<SessionNA, "user">{
    user: User;
}