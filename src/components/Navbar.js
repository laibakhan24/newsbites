import React from 'react'
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsBites</Link>

                    {/* ---- both buttons sit together on small screens ---- */}
                    <div className="d-flex align-items-center gap-2 ms-auto me-2 d-lg-none">
                        <button onClick={toggleDarkMode} className={`btn btn-${darkMode ? "light" : "dark"} toggle-btn`}>
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology">Technology</Link>
                            </li>
                        </ul>

                        {/* ---- toggle button on large screens ---- */}
                        <button onClick={toggleDarkMode} className={`btn btn-${darkMode ? "light" : "dark"} toggle-btn`}>
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar;