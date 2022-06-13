import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

export default function Profile() {
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
        <button className="profile-log-out" onClick={handleLogOut}>Log out</button>
        </>
    )
}