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
                {props.data.content}

        </div>
    )
}