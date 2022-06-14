import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/">
                        Home
                        </Link>
                        
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/profile">
                        Profile

                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/message">
                        Message
                        </Link>
                    </li>

                    <li className="navbar-item">
                        <Link className="navbar-link" to="/editor">
                        Post
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}