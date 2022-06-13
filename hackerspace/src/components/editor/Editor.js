import React from 'react';
import { useRef } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { app, db } from '../../firebase.config'
import { getAuth } from "firebase/auth";



export default function Editor() {
    let content = useRef()

    async function handlePost() {
        console.log(getAuth())
        console.log(content.current.value)
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                content: content.current.value
            });
            console.log("Document written with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <input className="editor-content" ref={content}/>
            <button className="editor-submit" onClick={handlePost}>Post</button>
        </>
    )
}