"use client"
import Image from "next/image"
import "./artwork.css"
import Link from "next/link"

export default function Artwork({ title, date, url }: any) {
    return (
        <div className="awwrapper" >
            <div className="awtop">
                {url == null ? <></> :
                    <Image loader={() => url} src={url} alt={""} layout='fill' objectFit="cover" />
                }
            </div>
            <div className="awbottom">
                <h4>{title}</h4>
                <h5>{date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}</h5>
            </div>
        </div>
    )
}