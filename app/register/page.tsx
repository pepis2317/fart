

import RegisterForm from '../components/Forms/RegisterForm'
import './register.css'
export default function Register() {
    return (
        <main className="registermain">
            <div className="registerwrapper">
                <h4>Let's get you set up real quick cuh</h4>
                <RegisterForm />
            </div>
        </main>
    )
}