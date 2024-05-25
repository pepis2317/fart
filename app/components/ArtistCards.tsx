"use client"
import "./artistcard.css"
import { db, storage } from '@/lib/firebase/firebaseConfig';
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";

import ArtistCard from './ArtistCard';
export default function ArtistCards() {
    const [artists, setArtists] = useState<any>([]);
    useEffect(() => {
        const fetchArtists = async () => {
            const q = query(collection(db, "users"), where("Commissioning", "==", true));
            const querySnapshot = await getDocs(q);
            const artistList = querySnapshot.docs.map(doc => ({
                UserID: doc.id,
                ...doc.data()
            }));
            setArtists(artistList);
        };
        fetchArtists();
    }, []);
    return (
        <div className="accontainer">
            {artists.map((a) => {
                return (
                    <ArtistCard UserID={a.UserID} Username={a.Username} banner={a.UserBanner} pfp={a.UserPfp} email={a.UserEmail}/>
                )
            })}
        </div>
    )
}