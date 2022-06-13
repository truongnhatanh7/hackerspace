import React from 'react';
import app from '../../firebase.config'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Auth() {
    let navigate = useNavigate()
    const email = useRef()
    const password = useRef()
    function handleSignIn() {
        console.log("trigger");
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
                navigate('/')
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
                <label className="auth-lable">Email</label>
                <input type="email" className="auth-input" ref={email} />
                <label className="auth-password" >Password</label>
                <input type="password" ref={password} />
                <button className="sign-in-btn" onClick={handleSignIn}>Sign in</button>
            </div>

        </>
    )
}