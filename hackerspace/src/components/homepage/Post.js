import React from 'react';
import { useEffect, useRef, useState } from 'react'
import './Home.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase.config'
import { LazyLoadImage } from 'react-lazy-load-image-component'
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
            
            <div className="post-header">
                <div className="post-avatar-wrapper">
                    <img src={props.data.creatorPhoto} className="post-avatar" />
                </div>
                <div className="post-info">
                    <p className="post-creator">{props.data.creatorName}</p>
                    <p className="post-time-stamp">
                        {new Date(props.data.createdDate).toString()}
                    </p>
                </div>
            </div>
            <div className="post-content">
                {props.data.content}
            </div>
            <div className="post-img-wrapper" ref={image}>
                
                {imgUrl != "" ? <LazyLoadImage className="post-img" src={imgUrl} loading="lazy"/> : ""}
            </div>
        </div>
    )
}