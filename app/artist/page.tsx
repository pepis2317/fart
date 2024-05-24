import prisma from "@/lib/prisma"
import './artistpage.css'
import Artwork from "@/app/components/Artwork"

type ArtistPageParams = {
    params: {
        slug: string
    },
    searchParams: {
        ID: string,
        Username: string,
        BannerURL: string
    }
}
export default async function Artist({ searchParams }: ArtistPageParams) {
    const artworks = await prisma.msArtwork.findMany({
        where: { UserID: searchParams.ID }
    })
    return (
        <main>
            {/* <Banner url={searchParams.BannerURL}/> */}
            <div className="portfoliobanner">
                <h4>{searchParams.Username}'s Portfolio Page</h4>
                <button>Commission {searchParams.Username}</button>
            </div>


            <div className="awcontainer">
                {artworks.map((artwork) => (
                    <Artwork title={artwork.ArtworkTitle} date={artwork.ArtworkDate} url={artwork.ArtworkImage} />
                ))}
                <Artwork title={"Filler"} url={null} />
                <Artwork title={"Filler"} url={null} />



            </div>

        </main>
    )
}