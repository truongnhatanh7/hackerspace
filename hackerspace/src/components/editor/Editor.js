import React from 'react';
import { useRef, useEffect } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { app, db } from '../../firebase.config'
import { getAuth } from "firebase/auth";
import './Editor.css'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import Navbar from '../common/Navbar'
import { v4 as uuidv4 } from 'uuid'

const storagePath = "gs://hackerspace-e947d.appspot.com/"

export default function Editor() {
    let content = useRef()
    let file = useRef()
    let navigate = useNavigate()

    useEffect(() => {
        if (getAuth().currentUser === null) {
            navigate('/auth')
        }
    }, [])

    async function handlePost() {
        try {
            let imgId = uuidv4()
            const storage = getStorage(app) 
            const storageRef = ref(storage, 'posts/' + imgId)
            let imgRef = storagePath + 'posts/' + imgId

            if (file.current.files.length > 0) {
                uploadBytes(storageRef, file.current.files[0]).then(snapshot => {
                    console.log("File uploaded", snapshot)
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                imgRef = ""
            }
            
            const docRef = await addDoc(collection(db, "posts"), {
                content: content.current.value,
                createdDate: new Date().getTime(),
                imgRef: imgRef
            });

            navigate("/")

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            <Navbar />
            <div className="editor-wrapper">
                <label className="editor-label">Content</label>
                <textarea className="editor-content" ref={content}/>
                <input type="file" className="editor-file" ref={file}/>
                <button className="editor-submit" onClick={handlePost}>Post</button>
            </div>
        </>
    )
}