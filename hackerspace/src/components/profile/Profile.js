import React from 'react';
import app from '../../firebase.config'
import { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import Navbar from '../common/Navbar'
import './Profile.css'

export default function Profile(props) {

    let navigate = useNavigate()


    useEffect(() => {
        if (getAuth().currentUser === null) {
            navigate('/auth')
        }
    }, [])

    function handleLogOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/auth')
        })
        .catch((error) => {
            console.log("Cannot log out");
        })
    }
    return (
        <>
        <Navbar />
        <div className="profile-wrapper">
            <img className="profile-avatar" src={getAuth().currentUser === null ? "" : getAuth().currentUser.photoURL} />  
            <h1 className="profile-title">Profile</h1>
            <h1 className="profile-name title">{getAuth().currentUser === null ? "" : getAuth().currentUser.displayName}</h1>
            <h1 className="profile-email title">{getAuth().currentUser === null ? "" : getAuth().currentUser.email}</h1>
            <button className="btn profile-change-password">Change Password</button>
            <button className="profile-log-out btn" onClick={handleLogOut}>Log out</button>
        </div>
        </>
    )
}