import React from 'react';
import Navbar from '../common/Navbar'
import Feed from './Feed'
import './Home.css'
export default function Home() {
    return (
        <>
            <Navbar />
            <Feed className="Feed" />
        </>
    )
}