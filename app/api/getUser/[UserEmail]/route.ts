import { db } from "@/lib/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import getImageDownloadURL from "../../getImageDownloadURL";
type User={
    UserID: string,
    Commissioning: boolean,
    UserBanner: string,
    UserEmail: string,
    UserPfp: string,
    Username: string
}
export async function GET(request: Request, context: any) {
    try {
        const { params } = context;

        const q = query(collection(db, "users"), where("UserEmail", "==", params.UserEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userData = querySnapshot.docs[0].data() as User;
        userData.UserID = querySnapshot.docs[0].id

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error('Error getting user: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}