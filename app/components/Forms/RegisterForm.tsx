"use client"
import { register } from '@/lib/firebase/auth';
import './form.css'
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseConfig';
export default function RegisterForm(){
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')?.toString()
        const email = formData.get('email')?.toString()
        const password = formData.get('password')?.toString()
        try{
            await register(email, password)
            const registeredUser = {
                Username: username,
                UserEmail: email,
                UserPfp:"profilePictures/default.jpg",
                UserBanner:"banners/blank.jpg",
                Commissioning:false
            }
            const docRef = await addDoc(collection(db, 'users'), registeredUser)
            console.log('Document written with ID: ', docRef.id);
            router.push('/login')
        }
        catch(err){
            console.log(err)
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="username" name="username" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
            <h1>{error}</h1>
        </form>
    )
}