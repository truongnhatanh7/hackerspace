import React from 'react';

import { app, db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from './Post'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Home.css'



export default function Feed(props) {
    console.log("rerender")
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
        <div className="Feed">

            {posts.length != 0 ? posts.map((post, index) => {
                return <Post data={post} key={index} />
            }) : <Skeleton className="post-wrapper" baseColor='rgb(229, 221, 194)' count={10}/>}
        </div>
    )
}