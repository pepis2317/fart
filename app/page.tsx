import ArtistCard from "@/app/components/ArtistCard";
import "./homepage.css";
import prisma from "@/lib/prisma";

export default async function Home() {
  const availableArtists = await prisma.msUser.findMany({
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
            <div className="line" />
          </div>
          <div className="accontainer">
            {availableArtists.map((a) => (<ArtistCard UserID={a.UserID} Username={a.Username} banner={a.UserBanner} pfp={a.UserPfp}/>))}
          </div>

        </div>
      </div>
      <h1 style={{ paddingTop: 1000 }}>ass</h1>
    </main>
  );
}
