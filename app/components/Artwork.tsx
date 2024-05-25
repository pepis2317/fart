"use client"
import Image from "next/image"
import "./artwork.css"
import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "@/lib/firebase/firebaseConfig"
export default function Artwork({ title, date, url }: any) {
    const [imageURL, setImageURL] = useState<string>()
    const imageRef = ref(storage, url)
    useEffect(() => {
        const test = async () => {
            console.log(imageRef.fullPath)
            const imageDownloadURL = await getDownloadURL(imageRef)
            setImageURL(imageDownloadURL)
        }
        test()
    })
    return (
        <div className="awwrapper" >
            <div className="awtop">
                {imageURL == null ? <></> :
                    <Image loader={() => imageURL} src={imageURL} alt={""} layout='fill' objectFit="cover" />
                }
            </div>
            <div className="awbottom">
                <h4>{title}</h4>
                <h5>{date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}</h5>
            </div>
        </div>
    )
}

