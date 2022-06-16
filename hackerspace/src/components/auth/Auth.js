import React from 'react';
import app from '../../firebase.config'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Auth.css'
export default function Auth() {
    let navigate = useNavigate()
    const email = useRef()
    const password = useRef()
    function handleSignIn() {
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        const user = userCredential.user
                        console.log(user)
                        navigate('/')
                    })
            })
            .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <>
            <div className="sign-in-wrapper">
                <label className="auth-label">Email</label>
                <input type="email" className="auth-input" ref={email} />
                <label className="auth-label" >Password</label>
                <input type="password" className="auth-input" ref={password} />
                <Link to="/register" className="register-link">Create new account</Link>
                <button className="sign-in-btn" onClick={handleSignIn}>Sign in</button>
            </div>
        </>
    )
}