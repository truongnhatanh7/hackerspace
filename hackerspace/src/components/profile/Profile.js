import React from 'react';
import app from '../../firebase.config'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import Navbar from '../common/Navbar'
import './Profile.css'

export default function Profile(props) {

    let navigate = useNavigate()
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
            <h1 className="profile-title">Profile</h1>
            <h1 className="profile-name title">Lorem ipsum</h1>
            <h1 className="profile-email title">Email</h1>
            <button className="btn profile-change-password">Change Password</button>
            <button className="profile-log-out btn" onClick={handleLogOut}>Log out</button>
        </div>
        </>
    )
}