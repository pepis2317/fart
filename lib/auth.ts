

import { getServerSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import {login} from "./firebase/auth"
export const authConfig: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
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
                try{
                    const user = await login(credentials.email, credentials.password)
                    const loggedUser = {
                        email: user.email,
                    }
                    return loggedUser as User
                }
                catch(err){
                    console.log(err)
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
