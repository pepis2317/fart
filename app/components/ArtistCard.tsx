"use client"
import "./artistcard.css"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { storage } from "@/lib/firebase/firebaseConfig"
import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "firebase/storage"


export default function ArtistCard({ UserID, Username, banner, pfp, email }: any) {
    const { status,data: session } = useSession()
    const [bannerURL, setBannerURL] = useState<string>()
    const [pfpURL, setPfpURL] = useState<string>()
    const bannerRef = ref(storage, banner)
    const pfpRef = ref(storage, pfp)

    useEffect(() => {
        const test = async () => {
            const bannerDownloadURL = await getDownloadURL(bannerRef)
            const pfpDownloadURL = await getDownloadURL(pfpRef)
            setPfpURL(pfpDownloadURL)
            setBannerURL(bannerDownloadURL)
        }
        test()
    }, [])
    if (status == "unauthenticated") {
        return (
            <Link href={{ pathname: "/login" }} key={UserID} className="acwrapper">
                <div className="actop">
                    <div className="acpfp">
                        {pfpURL == null ?
                            <></> : <Image loader={() => pfpURL} src={pfpURL} alt={""} layout='fill' objectFit="cover" />
                        }
                    </div>
                    {bannerURL == null ?
                        <></> : <Image loader={() => bannerURL} src={bannerURL} alt={""} layout='fill' objectFit="cover" />
                    }
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
                        {pfpURL == null ?
                            <></> : <Image loader={() => pfpURL} src={pfpURL} alt={""} layout='fill' objectFit="cover" />
                        }
                    </div>
                    {bannerURL == null ?
                        <></> : <Image loader={() => bannerURL} src={bannerURL} alt={""} layout='fill' objectFit="cover" />
                    }
                </div>
                <div className="acbottom"><h4>{Username}</h4></div>
            </Link>
        )
    }
    return (
        <Link href={{ pathname: "/artist", query: { ID: UserID, Username: Username, BannerURL: banner } }} key={UserID} className="acwrapper">
            <div className="actop">
                <div className="acpfp">
                    {pfpURL == null ?
                        <></> : <Image loader={() => pfpURL} src={pfpURL} alt={""} layout='fill' objectFit="cover" />
                    }
                </div>
                {bannerURL == null ?
                    <></> : <Image loader={() => bannerURL} src={bannerURL} alt={""} layout='fill' objectFit="cover" />
                }


            </div>
            {/* <h4>{imageURL.toString()}</h4> */}


            <div className="acbottom"><h4>{Username}</h4></div>
        </Link>
    )
}