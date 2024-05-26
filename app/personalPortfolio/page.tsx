'use client'
import Artworks from '../components/Artwork/Artworks'
import './personalPortfolio.css'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import UploadArt from '../components/UploadArt/UploadArt'




export default function PersonalPortfolio(){
    const { data: session, status } = useSession()
    const router = useRouter()
    const [user, setUser] = useState<any>()
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const savedUser = localStorage.getItem('loggedUser')
        if(status == 'unauthenticated'){
            router.push('/login')
        }
        if(!savedUser ){
            setLoading(false)
            router.push('/login')
            return
        }
        setUser(JSON.parse(savedUser))
    }, []);
    return(
        <main>
            <div className="portfoliobanner">
                <h4>Hello {user?.Username}</h4>
                <button>Open User Settings</button>
            </div>
            <UploadArt UserID={user?.UserID}/>
            {user && user.UserID?<Artworks UserID={user.UserID}/>:<></>}
        </main>
    )
}