'use client'
import { useSession } from 'next-auth/react'
import Artworks from '../components/Artworks'
import './personalPortfolio.css'
import { useEffect, useState } from 'react'
import { db, storage } from '@/lib/firebase/firebaseConfig';
import {ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid"
import { query, collection, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { User } from '@/lib/models/User'
import { useRouter } from 'next/navigation'



export default function PersonalPortfolio(){
    const router = useRouter()
    const { data: session, status } = useSession()
    const [user, setUser] = useState<User| null>()
    const [imageUpload, setImageUpload] = useState<any|null>(null)
    const uploadImage= async()=>{
        
        if(imageUpload == null) return
        const imageName = v4()+imageUpload.name
        const imageRef = ref(storage, `artworks/${imageName}`)
        uploadBytes(imageRef, imageUpload).then( async()=>{
            try{
                const data = {
                    ArtworkDate: Timestamp.now(),
                    ArtworkDescription:'test',
                    ArtworkImage: `artworks/${imageName}`,
                    ArtworkTitle:'test title',
                    UserID: user?.UserID
                }
                const docRef = await addDoc(collection(db, 'artworks'), data)
                console.log('Document written with ID: ', docRef.id);
                router.push('/personalPortfolio')
            }catch (e) {
                console.error('Error adding document: ', e);
              }
        })
        try{
            const data = {
                ArtworkDate: Timestamp.now(),
                ArtworkDescription:'test',
                ArtworkImage: `artworks/${imageName}`,
                ArtworkTitle:'test title',
                UserID: user?.UserID
            }
            const docRef = await addDoc(collection(db, 'artworks'), data)
            console.log('Document written with ID: ', docRef.id);
            router.push('/personalPortfolio')
        }catch (e) {
            console.error('Error adding document: ', e);
          }
    }
    useEffect(() => {
        if (!session?.user?.email) return;
        const fetchUser = async () => {
            try {
                const q = query(collection(db, "users"), where("UserEmail", "==", session?.user?.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data() as User;
                    userData.UserID = querySnapshot.docs[0].id
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);
    return(
        <main>
            <div className="portfoliobanner">
                <h4>Hello {user?.UserID}</h4>
                <button>View Account Settings</button>
            </div>
            <input type='file' onChange={(e)=>{setImageUpload(e.target.files[0])}}/>
            <button onClick={uploadImage}>Upload Artwork to Your Page</button>
            {user && user.UserID?<Artworks UserID={user.UserID}/>:<></>}
        </main>
    )
}