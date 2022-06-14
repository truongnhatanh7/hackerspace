import React from 'react';
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
export default function Message() {

    useEffect(() => {
        console.log(getAuth())
    }, [])


    return (
        <>
        message
        </>
    )
}