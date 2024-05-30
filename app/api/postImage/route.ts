import { storage } from "@/lib/firebase/firebaseConfig"
import { ref, uploadBytes } from "firebase/storage"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { imageUpload} = await request.json()
        if (!imageUpload) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 })
        }
        const test = imageUpload.folder
        console.log(test)
        const imageRef = ref(storage, `${imageUpload.folder}/${imageUpload.name}`)
        const imageBuffer = Buffer.from(imageUpload.data, 'base64');
        await uploadBytes(imageRef, imageBuffer)
        return NextResponse.json({message:'Image Uploaded Successfully'})
    }
    catch (error){
        console.error('Error uploading image or adding document: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}