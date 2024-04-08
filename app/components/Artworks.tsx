type artworkParams = {
    UserID: string
}
import prisma from "@/lib/prisma"
import "./artwork.css"

export default async function Artworks({ UserID }: artworkParams) {
    const artworks = await prisma.msArtwork.findMany({
        where: { UserID: UserID }
    })
    return (
        <div className="awcontainer">
            {artworks.map((artwork)=>(
            <div className="awwrapper">
                <div className="awtop"></div>
                <div className="awbottom">
                    <h4>{artwork.ArtworkTitle}</h4>
                    <h5>{artwork.ArtworkDate?.getDate()}/{artwork.ArtworkDate?.getMonth()}/{artwork.ArtworkDate?.getFullYear()}</h5>
                </div>
            </div>
            ))}
            <div className="awwrapper">
                <div className="awtop"></div>
                <div className="awbottom">
                    <h4>filler</h4>
                    <h5>00/00/00</h5>
                </div>
            </div>
            <div className="awwrapper">
                <div className="awtop"></div>
                <div className="awbottom">
                    <h4>filler</h4>
                    <h5>00/00/00</h5>
                </div>
            </div>
            <div className="awwrapper">
                <div className="awtop"></div>
                <div className="awbottom">
                    <h4>filler</h4>
                    <h5>00/00/00</h5>
                </div>
            </div>
            <div className="awwrapper">
                <div className="awtop"></div>
                <div className="awbottom">
                    <h4>filler</h4>
                    <h5>00/00/00</h5>
                </div>
            </div>
            <div className="awwrapper">
                <div className="awtop"></div>
                <div className="awbottom">
                    <h4>filler</h4>
                    <h5>00/00/00</h5>
                </div>
            </div>
        </div>
    )
}