"use client"
import { db, storage } from '@/lib/firebase/firebaseConfig';
import { useEffect, useState } from "react";
import { query, collection, where, getDocs, Timestamp } from "firebase/firestore";
import Artwork from './Artwork';

export default function Artworks({ UserID }: { UserID: string }) {
    const [artworks, setArtworks] = useState<any>([]);
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch(`/api/getArtworks/${UserID}`)
                const artworksList = await response.json()
                setArtworks(artworksList)
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchArtists();
    });
    return (
        <div className="awcontainer">
            {artworks.map((artwork: any) =>  (
                    <Artwork key={artwork.ArtworkID} title={artwork.ArtworkTitle} date={artwork.ArtworkDate} image={artwork.ArtworkImage} />
                )
            )}

        </div>
    )
}