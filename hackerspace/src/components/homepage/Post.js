import React from 'react';
import { useEffect } from 'react'
import './Home.css';
export default function Post(props) {

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div className="post-wrapper">
            {/* <div className="post__img-wrapper"> */}
                {/* <img src="" className="post__img" /> */}
            {/* </div>         */}
                {props.data.content}
            {/* <h1 className="post__title">Post title</h1> */}
        </div>
    )
}