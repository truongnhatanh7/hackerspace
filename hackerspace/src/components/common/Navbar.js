import './Navbar.css';
export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item"><a className="navbar-link" href="#">Home</a></li>
                    <li className="navbar-item"><a className="navbar-link" href="#">Profile</a></li>
                    <li className="navbar-item"><a className="navbar-link" href="#">Message</a></li>
                </ul>
            </nav>
        </>
    )
}