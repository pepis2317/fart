import { storage } from "@/lib/firebase/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

export default async function getImageDownloadURL(firebasePath:any): Promise<string>{
    const imageRef = ref(storage, firebasePath);
    const imageDownloadURL = await getDownloadURL(imageRef);
    return imageDownloadURL
}