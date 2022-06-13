import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/">
                        Home
                        </Link>
                        
                    </li>
                    <li className="navbar-item">
                        <Link to="/profile">
                        Profile

                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/message">
                        Message
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}