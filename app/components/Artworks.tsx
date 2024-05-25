"use client"
import { db, storage } from '@/lib/firebase/firebaseConfig';
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import Artwork from './Artwork';

export default function Artworks({UserID}:{UserID:string}) {
    const [artworks, setArtworks] = useState<any>([]);
    
    useEffect(() => {
        const fetchArtworks = async () => {
            const q = query(collection(db, "artworks"), where("UserID", "==", UserID));
            const querySnapshot = await getDocs(q);
            const artworksList = querySnapshot.docs.map(doc => ({
                ArtworkID: doc.id,
                ...doc.data()
            }));
            console.log(artworksList)
            setArtworks(artworksList);
        };
        fetchArtworks();
    },[]);
    return (
        <div className="awcontainer">
            {artworks.map((artwork) => (
                <Artwork key={artwork.ArtworkID} title={artwork.ArtworkTitle} date={artwork.ArtworkDate.toDate()} url={artwork.ArtworkImage} />
            ))}

        </div>
    )
}