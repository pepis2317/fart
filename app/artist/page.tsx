import { getServerSession } from "next-auth"
import Artworks from "../components/Artworks"
import { authConfig, loginIsRequiredServer } from "@/lib/auth"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

type ArtistPageParams={
    params:{
        slug:string
    },
    searchParams: { [ID: string]: string }
}
export default async function Artist({params, searchParams}: ArtistPageParams){
    return(
        <main>
            <Artworks UserID={searchParams.ID}/>
        </main>
    )
}