'use client'
import Artworks from '../components/Artwork/Artworks'
import './personalPortfolio.css'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import UploadArt from '../components/UploadArt/UploadArt'
import UserSettings from '../components/UserSettings/UserSettings'




export default function PersonalPortfolio() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const savedUser = localStorage.getItem('loggedUser')
        if (status == 'unauthenticated') {
            router.push('/login')
        }
        if (!savedUser) {
            router.push('/login')
            return
        }
        setUser(JSON.parse(savedUser))
    },[]);
    return (
        <main>
            <div className="portfoliobanner">
                <h4>Welcome to your portfolio page</h4>
            </div>
            <UserSettings UserEmail={user?.UserEmail}/>
            <UploadArt UserID={user?.UserID} />
            {user && user.UserID ? <Artworks UserID={user.UserID} /> : <></>}
        </main>
    )
}