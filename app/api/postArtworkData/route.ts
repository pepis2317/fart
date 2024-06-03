import { db } from "@/lib/firebase/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        const { title, description, UserID, imageName } = await request.json();
        if (!title || !description || !UserID) {
            return NextResponse.json({ error: 'Title, description, image, and UserID are required' }, { status: 400 });
        }
        const data = {
            ArtworkDate: Timestamp.now(),
            ArtworkDescription: description,
            ArtworkImage: `artworks/${imageName}`,
            ArtworkTitle: title,
            UserID: UserID,
        };
        const docRef = await addDoc(collection(db, 'artworks'), data);
        return NextResponse.json({ id: docRef.id, message: 'Image Data Uploaded Successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image or adding document: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}