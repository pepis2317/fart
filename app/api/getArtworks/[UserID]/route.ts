import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import getImageDownloadURL from "../../getImageDownloadURL";

export async function GET(request:Request, context: any) {
    try {
        const { params } = context
        const UserID = params.UserID
        const q = query(collection(db, "artworks"), where("UserID", "==", UserID));
        const querySnapshot = await getDocs(q);
        const artworksList = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data()
            let imageURL = ''
            let artworkDate = data.ArtworkDate.toDate()
            
            if (data.ArtworkImage) {
                imageURL = await getImageDownloadURL(data.ArtworkImage) 
            }


            return {
                ArtworkID: doc.id,
                ArtworkDate: artworkDate.getDate()+'/'+artworkDate.getMonth()+'/'+artworkDate.getFullYear(),
                UserID: data.UserID,
                ArtworkImage: imageURL,
                ArtworkTitle: data.ArtworkTitle,
                ArtworkDescription: data.ArtworkDescription
            }
        }))


        return NextResponse.json(artworksList, { status: 200 });
    } catch (error) {
        console.error("Error fetching artists:", error);
        return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
    }
}