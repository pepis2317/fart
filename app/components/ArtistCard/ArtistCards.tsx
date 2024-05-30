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
            try{
                const response = await fetch('/api/getCommissioning')
                const artistList = await response.json()
                setArtists(artistList)
            }
            catch(err){
                console.log(err)
            }
        };
        fetchArtists();
    },[]);
    return (
        <div className="accontainer">
            {artists.map((a:any) => {
                return (
                    <ArtistCard UserID={a.UserID} Username={a.Username} banner={a.UserBanner} pfp={a.UserPfp} email={a.UserEmail}/>
                )
            })}
        </div>
    )
}