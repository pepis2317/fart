import { getServerSession } from "next-auth"
import Artworks from "../components/Artworks"
import prisma from "@/lib/prisma"
import './artistpage.css'
type ArtistPageParams = {
    params: {
        slug: string
    },
    searchParams: { [ID: string]: string }
}
export default async function Artist({ params, searchParams }: ArtistPageParams) {
    const user = await prisma.msUser.findFirst({
        where: { UserID: searchParams.ID }
    })
    return (
        <main>
            <div className="portfoliobanner"></div>
            <div className="portfoliotop">
                <h4>{user?.Username}'s Portfolio Page</h4>
                <button>Commission {user?.Username}</button>
            </div>

            <Artworks UserID={searchParams.ID} />

        </main>
    )
}