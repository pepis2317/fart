'use client'

import { login } from '@/lib/firebase/auth'
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import './form.css'
import { signIn } from 'next-auth/react'
import { db, storage } from '@/lib/firebase/firebaseConfig';
import { query, collection, where, getDocs } from "firebase/firestore";
type User = {
    UserID: string,
    Commissioning: boolean,
    UserBanner: string,
    UserEmail: string,
    UserPfp: string,
    Username: string
}

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    async function saveUserData(email: string | undefined) {
        try {
            const response = await fetch(`/api/getUser/${email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            localStorage.setItem('loggedUser', JSON.stringify(userData))
            // const q = query(collection(db, "users"), where("UserEmail", "==", email));
            // const querySnapshot = await getDocs(q);

            // if (!querySnapshot.empty) {
            //     const userData = querySnapshot.docs[0].data() as User;
            //     userData.UserID = querySnapshot.docs[0].id
            //     localStorage.setItem('loggedUser', JSON.stringify(userData))
            // }
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    }
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')?.toString()
        const password = formData.get('password')?.toString()
        const signInResponse = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });
        saveUserData(email)
        if (signInResponse && !signInResponse.error) {
            router.push('/')
        } else {
            console.log("Error: ", signInResponse);
            setError("Your Email or Password is wrong!");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <h1>{error}</h1>
        </form>
    )
}