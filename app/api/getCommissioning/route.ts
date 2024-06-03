import { db, storage } from '@/lib/firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { NextResponse } from 'next/server';
import getImageDownloadURL from '../getImageDownloadURL';
export async function GET() {
    try {
        const q = query(collection(db, "users"),where("Commissioning", "==", true));
        const querySnapshot = await getDocs(q);
        const artistList = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data()
            let pfpURL = ''
            let bannerURL = ''
            
            if (data.UserPfp && data.UserBanner) {
                pfpURL = await getImageDownloadURL(data.UserPfp)
                bannerURL = await getImageDownloadURL(data.UserBanner)     
            }

            return {
                UserID: doc.id,
                UserPfp: pfpURL,
                UserBanner: bannerURL,
                UserEmail: data.UserEmail,
                Commissioning: data.Commissioning,
                Username: data.Username
            }
        }))

        return NextResponse.json(artistList, { status: 200 });
    } catch (error) {
        console.error("Error fetching artists:", error);
        return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 });
    }
}