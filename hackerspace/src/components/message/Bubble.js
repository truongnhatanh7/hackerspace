import React from 'react';
import { getAuth } from 'firebase/auth'
import './Message.css'


export default function Bubble(props) {
    let isCurrentUser = getAuth().currentUser.uid == props.data.sender
    return (
        <>
            <div className={`chat-bubble ${isCurrentUser ? "chat-current" : ""}`}>
                <div className={`chat-bubble-img-wrapper ${isCurrentUser ? "chat-bubble-img-right" : ""}`}>
                    <img src={props.data.senderImg} className="chat-bubble-img"/>
                </div>
                <div className={`chat-bubble-content-wrapper ${isCurrentUser ? "chat-bubble-content-current" : ""}`}>
                    <h1 className="chat-bubble-creator">{props.data.senderDisplayName}</h1>
                    <p className="chat-bubble-content">{props.data.content}</p>
                </div>
            </div>
        </>
    )
}