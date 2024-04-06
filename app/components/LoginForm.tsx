'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import './form.css'
export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const signInResponse = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });

        if (signInResponse && !signInResponse.error) {
            router.push('/')
        } else {
            console.log("Error: ", signInResponse);
            setError("Your Email or Password is wrong!");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <button type="submit">Login</button>
            <h1>{error}</h1>
        </form>
    )
}