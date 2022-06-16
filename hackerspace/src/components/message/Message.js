import React from 'react';
import { useEffect, useRef, useState } from 'react'
import { app, db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit, addDoc } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid'
import Navbar from '../common/Navbar'
import Bubble from './Bubble'
import './Message.css'
export default function Message() {
    let navigate = useNavigate()

    let messageRef = useRef();
    let chatWrapperRef = useRef();
    let lastMessageRef = useRef();
    let [messages, setMessages] = useState([]);
    let [loadLimit, setLoadLimit] = useState(20);
    console.log(messages)

    useEffect(() => {
        if (getAuth().currentUser === null) {
            navigate('/auth')
            return;
        }
        renderMessages()
    }, [])

    useEffect(() => {
        // chatWrapperRef.current.scrollIntoView()
        lastMessageRef.current.scrollIntoView()

    }, [messages])

    async function handleSendMessage() {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                id: uuidv4(),
                content: messageRef.current.value, 
                sender: getAuth().currentUser.uid,
                senderDisplayName: getAuth().currentUser.displayName,
                senderImg: getAuth().currentUser.photoURL,
                timestamp: new Date().getTime()
            })
            .then(() => {
                messageRef.current.value = ""
                renderMessages()
            })
            .then(() => {
                messageRef.current.focus()
            })
        } catch (err) {
            console.log(err)
        }
    }

    async function renderMessages() {
        try {
            const ref = collection(db, "messages")
            let q = query(ref, orderBy("timestamp", "desc"), limit(loadLimit))
            const queriedDoc = await getDocs(q)
            let tempMessages = []
            queriedDoc.forEach(doc => {
                tempMessages.push(doc.data())
            })
            tempMessages = tempMessages.reverse()
            setMessages(tempMessages)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
        <Navbar />
        <div className="chat-wrapper">
            <h1 className="">Message</h1>
            <div className="chat-content" ref={chatWrapperRef}>
                {messages.map((message) => {
                    return <Bubble data={message} key={message.id}/>
                })}
                <div className="chat-bottom-scroll" ref={lastMessageRef}></div>
            </div>
            <div className="chat-input-wrapper">
                <textarea className="chat-input-content" ref={messageRef}></textarea>
                <button className="chat-send-btn" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
        </>
    )
}