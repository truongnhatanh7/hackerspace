import React from 'react';
import { useEffect, useRef, useState } from 'react'
import './Home.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.config'
export default function Post(props) {
    let image = useRef()
    const storage = getStorage(app)
    let [imgUrl, setImgUrl] = useState("")

    console.log(imgUrl)
    useEffect(() => {
        if (props.data.imgRef !== "") {
            const imgRef = ref(storage, props.data.imgRef)

            getDownloadURL(imgRef)
                .then((url) => {
                    setImgUrl(url)
                })
        }
    }, [])

    return (
        <div className="post-wrapper">

            <div className="post-timestamp">
                {new Date(props.data.createdDate).toString()}
            </div>
            <div className="post-content">
                {props.data.content}
            </div>
            <div className="post-img-wrapper" ref={image}>
                {imgUrl != "" ? <img className="post-img" src={imgUrl}/> : ""}
            </div>
        </div>
    )
}