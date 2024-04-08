"use client"

import { signOut, useSession } from "next-auth/react"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export default function Rightnav() {
    const { status, data: session } = useSession()
    const router = useRouter()
    if (status == "authenticated") {
        return (
            <div className="rightnav">
                <button className="logoutbutton" onClick={()=>{
                    signOut({
                        callbackUrl:'/'
                    })
                }}>
                    <p>Logout</p>
                    </button>
            </div>
        )
    }
    else {
        return (
            <div className="rightnav">
                <Link className="topnavlink" href={"/login"}>Login</Link>
                <Link className="topnavlink" href={"/register"}>Register</Link>
            </div>
        )
    }
}