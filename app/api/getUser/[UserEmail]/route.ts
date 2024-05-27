import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import getImageDownloadURL from "../../getImageDownloadURL";

export async function GET(request: Request, context: any) {
    try {
        const { params } = context;

        const q = query(collection(db, "users"), where("UserEmail", "==", params.UserEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        let userData = {};
        const userPromises = querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            let pfpURL = '';
            let bannerURL = '';

            if (data.UserPfp) {
                pfpURL = await getImageDownloadURL(data.UserPfp);
            }
            if (data.UserBanner) {
                bannerURL = await getImageDownloadURL(data.UserBanner);
            }

            return {
                UserID: doc.id,
                UserPfp: pfpURL,
                UserBanner: bannerURL,
                UserEmail: data.UserEmail,
                Commissioning: data.Commissioning,
                Username: data.Username
            };
        });

        const users = await Promise.all(userPromises);

        if (users.length > 0) {
            userData = users[0];  // Assuming you expect a single user, or change accordingly if multiple users
        }

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error('Error getting user: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}