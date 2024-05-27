'use client'
import './uploadart.css'
import { useRef, useState } from "react";
import { v4 } from "uuid"
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
        const reader = new FileReader()
        const imageName = v4() + imageUpload.name
        reader.readAsDataURL(imageUpload)
        reader.onloadend = async () => {
            try {
                const imageRes = await fetch('/api/postImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imageUpload: {
                            folder: 'artworks',
                            name: imageName,
                            data: reader.result.split(',')[1]
                        }
                    })
                })
                if (!imageRes.ok) {
                    throw new Error('Failed to upload image');
                }
                const imageRespone = await imageRes.json()
                console.log('Image uploaded', imageRespone)
            } catch (error) {
                console.error('Error uploading image:', error);
            }
            try {
                const artworkDataRes = await fetch('/api/postArtworkData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        UserID,
                        imageName: imageName
                    })
                })
                if (!artworkDataRes.ok) {
                    throw new Error('Failed to upload artwork data')
                }
                const artworkDataResponse = await artworkDataRes.json()
                console.log('Artwork data uploaded', artworkDataResponse)
                setWarnText("Image Uploaded Successfully")
            }
            catch (error) {
                console.error('Error uploading artwork data:', error);
            }
        }
        fileInputRef.current.value = null;
        titleInputRef.current.value = '';
        descriptionInputRef.current.value = '';
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