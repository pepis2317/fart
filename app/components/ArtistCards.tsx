import { msUser } from "@prisma/client";
import "./artistcard.css"
import ArtistCard from "./ArtistCard";

type ArtistCards = {
    artists: msUser[]
}
export default async function ArtistCards({ artists }: ArtistCards) {
    return (
        <div className="accontainer">
            {artists.map((a) => (
                <ArtistCard UserID={a.UserID} Username={a.Username}/>
            ))}
            <ArtistCard UserID={'pluh'} Username={'filler'}/>
            <ArtistCard UserID={'pluh'} Username={'filler'}/>
            <ArtistCard UserID={'pluh'} Username={'filler'}/>


        </div>
    )
}