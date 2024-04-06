import { authConfig } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import Link from "next/link"
import "./navbar.css"
import { useSession } from "next-auth/react";
import Rightnav from "./Rightnav";
type navParams = {
    session: Session | null
}
export default function Navbar() {
    return (
        <nav className="topnav">
            <div className="leftnav">
                <Link className="homelink" href={"/"}>Fart</Link>
                {/* {session?<h1>{session.user?.name}</h1>:<></>} */}
            </div>
            <Rightnav/>
        </nav>
    )
}