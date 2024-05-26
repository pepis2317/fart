"use client"
import "./artistcard.css"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"


export default function ArtistCard({ UserID, Username, banner, pfp, email }: any) {
    const { status,data: session } = useSession()

    if (status == "unauthenticated") {
        return (
            <Link href={{ pathname: "/login" }} key={UserID} className="acwrapper">
                <div className="actop">
                    <div className="acpfp">
                        {pfp == '' ? <></> : <Image loader={() => pfp} src={pfp} alt={""} layout='fill' objectFit="cover" />}
                    </div>
                    {banner == '' ? <></> : <Image loader={() => banner} src={banner} alt={""} layout='fill' objectFit="cover" />}
                </div>
                <div className="acbottom"><h4>{Username}</h4></div>
            </Link>
        )
    }
    if(session?.user?.email == email){
        return (
            <Link href={{ pathname: "/personalPortfolio" }} key={UserID} className="acwrapper">
                <div className="actop">
                    <div className="acpfp">
                        {pfp == '' ? <></> : <Image loader={() => pfp} src={pfp} alt={""} layout='fill' objectFit="cover" />}
                    </div>
                    {banner == '' ? <></> : <Image loader={() => banner} src={banner} alt={""} layout='fill' objectFit="cover" />}
                </div>
                <div className="acbottom"><h4>{Username}</h4></div>
            </Link>
        )
    }
    return (
        <Link href={{ pathname: "/artist", query: { ID: UserID, Username: Username, BannerURL: banner } }} key={UserID} className="acwrapper">
            <div className="actop">
                <div className="acpfp">
                    {pfp == '' ? <></> : <Image loader={() => pfp} src={pfp} alt={""} layout='fill' objectFit="cover" />}
                </div>
                {banner == '' ? <></> : <Image loader={() => banner} src={banner} alt={""} layout='fill' objectFit="cover" />}
            </div>
            <div className="acbottom"><h4>{Username}</h4></div>
        </Link>
    )
}