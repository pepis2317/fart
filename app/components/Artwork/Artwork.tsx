"use client"
import Image from "next/image"
import "./artwork.css"
import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "firebase/storage"
import { storage } from "@/lib/firebase/firebaseConfig"
export default function Artwork({ title, date, image }: any) {

    return (
        <div className="awwrapper" >
            <div className="awtop">
                {image == null ? <></> :
                    <Image loader={() => image} src={image} alt={""} layout='fill' objectFit="cover" />
                }
            </div>
            <div className="awbottom">
                <h4>{title}</h4>
                {/* <h5>{date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}</h5> */}
                <h5>{date}</h5>
            </div>
        </div>
    )
}

