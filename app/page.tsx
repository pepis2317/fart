import ArtistCard from "@/app/components/ArtistCard";
import "./homepage.css";
import prisma from "@/lib/prisma";
import { db } from '@/lib/firebase/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import ArtistCards from "./components/ArtistCards";


export default async function Home() {
  
  return (
    <main>
      <div className="welcomecontainer">
        <h2>Welcome to Fart</h2>
        <h4>It stands for fantastic art</h4>

      </div>
      <div className="commscontainer">
        <div className="">
          <div className="commstitle">
            <h4>Commissionning Artists</h4>
            <div className="line" />
          </div>
          <ArtistCards/>
        </div>
      </div>
      <h1 style={{ paddingTop: 1000 }}>ass</h1>
    </main>
  );
}
