"use client"
import { authConfig } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { getSession, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function ArtistCard({ UserID, Username }: any) {
    const { status, data: session } = useSession()
    if (status == "unauthenticated") {
        return (
            <Link
                href={{ pathname: "/login"}}
                key={UserID}
                className="acwrapper"
            >
                <div className="acpfp"></div>
                <div className="acbottom"><h4>{Username}</h4></div>
            </Link>
        )
    }
    return (
        <Link
            href={{ pathname: "/artist", query: { ID: UserID } }}
            key={UserID}
            className="acwrapper"
        >
            <div className="acpfp"></div>
            <div className="acbottom"><h4>{Username}</h4></div>
        </Link>
    )
}