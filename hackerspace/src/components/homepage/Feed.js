import React from 'react';

import { app, db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from './Post'
import './Home.css'

export default function Feed(props) {
    let navigate = useNavigate()
    let [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(getAuth())
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                let tempList = []
                querySnapshot.forEach((doc) => {
                    tempList.push(doc.data())
                })
                setPosts(tempList)
            } catch (e) {
                console.log(e)
                navigate('/auth')
            }
        })()
        
    }, [])

    return (
        <>
            {posts.map((post, index) => {
                return <Post data={post} key={index} />
            })}
        </>
    )
}