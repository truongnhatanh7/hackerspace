import React from 'react';
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import Navbar from '../common/Navbar'
import './Message.css'
export default function Message() {

    useEffect(() => {
        console.log(getAuth())
    }, [])


    return (
        <>
        <Navbar />
        <div className="chat-wrapper">
            <h1 className="">Lab40</h1>
            <div className="chat-content">
                <div className="chat-bubble">
                    <div className="chat-bubble-img-wrapper">
                    </div>
                    <div className="chat-bubble-content-wrapper">
                        <h1 className="chat-bubble-creator">Credence</h1>
                        <p className="chat-bubble-content">This is a message</p>
                    </div>
                </div>

                <div className="chat-bubble chat-current">
                    <div className="chat-bubble-img-wrapper chat-bubble-img-right">
                    </div>
                    <div className="chat-bubble-content-wrapper chat-bubble-content-current">
                        <h1 className="chat-bubble-creator">Credence</h1>
                        <p className="chat-bubble-content">This is a message</p>
                    </div>
                </div>
            </div>
            <div className="chat-input-wrapper">
                <textarea className="chat-input-content"></textarea>
                <button className="chat-send-btn">Send</button>
            </div>
        </div>
        </>
    )
}