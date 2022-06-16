import React from 'react';

import { app, db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, orderBy, startAt } from "firebase/firestore"; 
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
        (async () => {
            try {
                const ref = collection(db, "posts")
                const q = query(ref, orderBy("createdDate", "desc"));
                const queriedDoc = await getDocs(q);
                let tempList = []
                queriedDoc.forEach(doc => {
                    tempList.push({...doc.data(), id: doc.id})
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
            }) : <Skeleton className="post-wrapper" baseColor='rgb(243, 240, 231)' count={20}/>}
        </div>
    )
}