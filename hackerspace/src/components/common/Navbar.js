import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom'
import { BiHomeCircle, 
    BiMessage,
    BiUser,
    BiPlus
} from "react-icons/bi";

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/">
                        <BiHomeCircle className="navbar-icon"/>
                        </Link>
                        
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/profile">

                        <BiUser className="navbar-icon"/>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/message">
                        <BiMessage className="navbar-icon"/>
                        </Link>
                    </li>

                    <li className="navbar-item">
                        <Link className="navbar-link" to="/editor">
                        <BiPlus className="navbar-icon"/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}