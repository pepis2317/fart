
import './artistpage.css'
import Artworks from "../components/Artwork/Artworks"

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
    return (
        <main>
            <div className="portfoliobanner">
                <h4>{searchParams.Username}'s Portfolio Page</h4>
                <button>Commission {searchParams.Username}</button>
            </div>
            <Artworks UserID={searchParams.ID}/>

        </main>
    )
}