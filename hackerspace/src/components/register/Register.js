import React from 'react';
import { useRef, useState, useEffect } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { app, db } from '../../firebase.config'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
import '../common/Form.css'
import './Register.css'
import { v4 as uuidv4 } from 'uuid'

const storagePath = "gs://hackerspace-e947d.appspot.com/"

export default function Register() {

    const email = useRef()
    const password = useRef()
    const name = useRef()

    

    function handleRegister() {
        console.log("Register info: ", email.current.value, password.current.value)
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(userCredential => {
                uploadDefaultAvatar()
                updateProfile(getAuth().currentUser, {
                    displayName: name.current.value
                })

            })
            .catch(error => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    async function uploadDefaultAvatar() {
        let imgId = uuidv4()
        const storage = getStorage(app)
        const storageRef = ref(storage, 'avatars/' + imgId)
        const randomAvatar =  new File([getRandomAvatar()], "avatar.svg", {
            type: 'image/svg+xml'
        })

        uploadBytes(storageRef, randomAvatar).then(snapshot => {
            console.log("file uploaded")
        })

    }

    return (
        <>
            <div className="register-wrapper">
            <label className="auth-label">Display name</label>
                <input type="text" className="auth-input" ref={name} />

                <label className="auth-label">Email</label>
                <input type="email" className="auth-input" ref={email} />

                <label className="auth-label" >Password</label>
                <input type="password" className="auth-input" ref={password} />

                <button className="sign-in-btn" onClick={handleRegister}>Register</button>
            </div>

        </>
    )
}