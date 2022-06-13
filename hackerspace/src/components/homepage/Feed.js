import React from 'react';

import { app, db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react'
import Post from './Post'
import './Home.css'

export default function Feed(props) {
    
    let [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            let tempList = []
            querySnapshot.forEach((doc) => {
                tempList.push(doc.data())
            })
            setPosts(tempList)
    
        })()
        
    })

    return (
        <>
            {posts.map(post => {
                return <Post data={post} />
            })}
        </>
    )
}