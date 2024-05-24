

import LoginForm from '@/app/components/LoginForm'
import './login.css'
export default function Login() {
    return (
        <main className="loginmain">
            <div className="loginwrapper">
                <h4>Login to start using Fart</h4>
                <LoginForm />

            </div>
        </main>
    )
}