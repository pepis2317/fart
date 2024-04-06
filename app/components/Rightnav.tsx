"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Rightnav() {
    const { status, data: session } = useSession()
    if (status == "authenticated") {
        return (
            <div className="rightnav">
                <button className="logoutbutton" onClick={()=>signOut()}>
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