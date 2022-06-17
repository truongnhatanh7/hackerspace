import React from 'react';
import { useEffect, useRef, useState } from 'react'
import { app, db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit, addDoc, doc, onSnapshot } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid'
import Navbar from '../common/Navbar'
import Bubble from './Bubble'
import './Message.css'
export default function Message() {
    let navigate = useNavigate()
    if (getAuth().currentUser === null) {
        navigate('/auth')
    }
    
    let messageRef = useRef();
    let chatWrapperRef = useRef();
    let lastMessageRef = useRef();
    let [messages, setMessages] = useState([]);
    let [firstLoad, setFirstLoad] = useState(true);
    let [loadLimit, setLoadLimit] = useState(10)
    let [loadStatus, setLoadStatus] = useState({
        firstLoad: true,
        scrollBottom: 0,
        loadLimit: 10,
        currentHeight: 0
    })

    useEffect(() => {
        const q = query(collection(db, "messages"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            renderMessages()
            setLoadStatus({...loadStatus, scrollBottom: 0})
        });
        return unsubscribe
    }, [])

    function handleScroll() {
        if (loadStatus.firstLoad) {
            setLoadStatus({...loadStatus, firstLoad : false})
        }
        if (chatWrapperRef.current.scrollTop < 20) {
            setLoadStatus(prevLoadStatus => {
                return (
                    {...loadStatus,
                        scrollBottom: chatWrapperRef.current.scrollHeight - chatWrapperRef.current.clientHeight - chatWrapperRef.current.scrollTop,
                        loadLimit: prevLoadStatus.loadLimit + 10,
                        currentHeight: chatWrapperRef.current.scrollHeight - chatWrapperRef.current.clientHeight
                    }
                )
            })
        }
    }

    useEffect(() => {
        console.log(loadStatus.loadLimit)

        renderMessages()
    }, [loadStatus])

    useEffect(() => {
        if (loadStatus.firstLoad) {
            lastMessageRef.current.scrollIntoView()
        } else {
            chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight - chatWrapperRef.current.clientHeight - loadStatus.scrollBottom
        }
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
            let q = query(ref, orderBy("timestamp", "desc"), limit(loadStatus.loadLimit))
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
            <div className="chat-content" ref={chatWrapperRef} onScroll={handleScroll}>
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