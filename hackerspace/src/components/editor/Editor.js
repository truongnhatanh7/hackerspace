import React from 'react';
import { useRef, useEffect } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { app, db } from '../../firebase.config'
import { getAuth } from "firebase/auth";
import './Editor.css'
import { useNavigate } from 'react-router-dom'



export default function Editor() {
    let content = useRef()
    let navigate = useNavigate()
    useEffect(() => {
        content.current.focus()
    }, [])

    async function handlePost() {
        console.log(getAuth())
        console.log(content.current.value)
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                content: content.current.value
            });
            // console.log("Document written with ID: ", docRef.id);
            
            navigate("/")

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="editor-wrapper">
            <label className="editor-label">Content</label>
            <textarea className="editor-content" ref={content}/>
            <button className="editor-submit" onClick={handlePost}>Post</button>
        </div>
    )
}