import React from 'react';
import { useRef } from 'react'
import app from '../../firebase.config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {

    const email = useRef()
    const password = useRef()

    function handleRegister() {
        console.log("Register info: ", email.current.value, password.current.value)
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(userCredential => {
                const user = userCredential.user
            })
            .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <>
            <div className="register-wrapper">
                <label className="auth-lable">Email</label>
                <input type="email" className="auth-input" ref={email} />
                <label className="register-password" >Password</label>
                <input type="password" ref={password}/>
                <button className="sign-in-btn" onClick={handleRegister}>Register</button>
            </div>

        </>
    )
}