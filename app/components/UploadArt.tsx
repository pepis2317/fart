'use client'
import './uploadart.css'
import { useRef, useState } from "react";
import { db, storage } from '@/lib/firebase/firebaseConfig';
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { collection, addDoc, Timestamp } from "firebase/firestore";
export default function UploadArt({ UserID }: any) {
    const [imageUpload, setImageUpload] = useState<any | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [warnText, setWarnText] = useState("")
    const fileInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const uploadImage = async () => {
        if (!imageUpload) return;
        if (title == "" || description == "") {
            setWarnText("Title and Description Empty")
            return;
        }
        const imageName = `${v4()}${imageUpload.name}`;
        const imageRef = ref(storage, `artworks/${imageName}`);
        try {
            await uploadBytes(imageRef, imageUpload);
            const data = {
                ArtworkDate: Timestamp.now(),
                ArtworkDescription: description,
                ArtworkImage: `artworks/${imageName}`,
                ArtworkTitle: title,
                UserID: UserID,
            };

            const docRef = await addDoc(collection(db, 'artworks'), data);
            console.log('Document written with ID: ', docRef.id);
            fileInputRef.current.value = null;
            titleInputRef.current.value = '';
            descriptionInputRef.current.value = '';
            setWarnText("Image Uploaded Successfully")
        } catch (error) {
            console.error('Error uploading image or adding document: ', error);
        }
    }
    return (
        <div className="uploadwrapper">
            <div className="uploadcontainer">
                <input type='file' ref={fileInputRef} onChange={(e) => { setImageUpload(e.target.files[0]) }} />
                <input type="text" ref={titleInputRef} placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
                <input type="text" ref={descriptionInputRef} placeholder="Description" onChange={(e) => { setDescription(e.target.value) }} />
                <button onClick={uploadImage}>Upload Artwork to Your Page</button>
                <h5>{warnText}</h5>
            </div>

        </div>
    )
}