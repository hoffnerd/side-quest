import { PrismaAdapter } from "@auth/prisma-adapter";
import { ConvexAdapter } from "../ConvexAdapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { SignJWT, importPKCS8 } from "jose";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/server/db";


/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session {
        convexToken: string;
    }
    // interface Session extends DefaultSession {
    //     user: {
    //         id: string;
    //         // ...other properties
    //         // role: UserRole;
    //     } & DefaultSession["user"];
    // }
}

const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(
    /.cloud$/,
    ".site",
);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
    providers: [
        // DiscordProvider,
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
    adapter: ConvexAdapter,
    callbacks: {
        async session({ session }) {
            const privateKey = await importPKCS8(
                process.env.CONVEX_AUTH_PRIVATE_KEY!,
                "RS256",
            );
            const convexToken = await new SignJWT({
                sub: session.userId,
            })
                .setProtectedHeader({ alg: "RS256" })
                .setIssuedAt()
                .setIssuer(CONVEX_SITE_URL)
                .setAudience("convex")
                .setExpirationTime("1h")
                .sign(privateKey);
            return { ...session, convexToken };
        },
        // session: ({ session, user }) => ({
        //     ...session,
        //     user: {
        //         ...session.user,
        //         id: user.id,
        //     },
        // }),
    },
} satisfies NextAuthConfig;
