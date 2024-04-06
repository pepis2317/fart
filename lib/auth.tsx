import prisma from "./prisma";

import { getServerSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) return null
                const dbUser = await prisma.msUser.findFirst({
                    where: { UserEmail: credentials.email }
                })
                if (dbUser && dbUser.UserPassword == credentials.password) {
                    const ass = {
                        name: dbUser.Username,
                        image: dbUser.UserPfp,
                        email: dbUser.UserEmail
                    }
                    return ass as User;
                }
                return null
            }
        }),
    ]
}
export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
    if (typeof window !== "undefined") {
        const session = useSession();
        const router = useRouter();
        if (!session) router.push("/");
    }
}
