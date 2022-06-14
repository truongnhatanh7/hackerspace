import React from 'react';
import { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import Feed from './Feed'
import './Home.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    let navigate = useNavigate()
    return (
        <>
            <Navbar />
            <Feed className="Feed"/>
        </>
    )
}