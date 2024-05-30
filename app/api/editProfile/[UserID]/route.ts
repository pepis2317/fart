import { db } from "@/lib/firebase/firebaseConfig";
import { error } from "console";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PUT(request: Request, context: any) {
    try {
        const {params} = context
        const UserID = params.UserID
        const { UserPfp, UserBanner, Username, Commissioning} = await request.json();
        const userDocRef = doc(db, 'users', UserID);

        // Prepare the update object
        const updateData = {};

        // Only add fields to updateData if they are not undefined
        if (Username !== undefined) updateData.Username = Username;
        if (Commissioning !== undefined) updateData.Commissioning = Commissioning;
        if (UserBanner !== undefined) updateData.UserBanner = UserBanner;
        if (UserPfp !== undefined) updateData.UserPfp = UserPfp;

        // Check if there are any fields to update
        if (Object.keys(updateData).length > 0) {
            await updateDoc(userDocRef, updateData);
            return NextResponse.json({ id: UserID, message: 'Image Data Uploaded Successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No valid data provided for update' }, { status: 400 });
        }

    }
    catch (error) {
        console.error('Error uploading image or adding document: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}