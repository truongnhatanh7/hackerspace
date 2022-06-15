import React from 'react';
import { useEffect } from 'react'
import './Home.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Post(props) {

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div className="post-wrapper">
            <div className="post-timestamp">
                {new Date(props.data.createdDate).toString()}
            </div>
            <div className="post-content">
                {props.data.content}
            </div>
            <div className="post-img">
                
            </div>
        </div>
    )
}