import Image from "next/image";
import "./homepage.css";
import prisma from "@/lib/prisma";
import ArtistCard from "./components/ArtistCards";
import ArtistCards from "./components/ArtistCards";

export default async function Home() {
  const availableUsers = await prisma.msUser.findMany({
    where: { Commissioning: 1 }
  })
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
            <div className="line"/>
          </div>
          <ArtistCards artists={availableUsers} />
        </div>
      </div>
      <h1 style={{ paddingTop: 1000 }}>ass</h1>
    </main>
  );
}
