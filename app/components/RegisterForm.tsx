"use client"
import './form.css'
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterForm(){
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')?.toString()
        const email = formData.get('email')?.toString()
        const password = formData.get('password')?.toString()
        const response = await fetch('/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username: username,
                UserEmail: email,
                UserPassword: password
            })
        })
        if(response.ok){
            router.push('/login')
        }else{
            setError('Registration failed')
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