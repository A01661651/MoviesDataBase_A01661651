import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import "./Header.css";


const Header: React.FC = () => {
    return (
        <div>
            <div className="App-header">
                <div className="header-wrapper">
                    <div className="header-logo">
                        <a className="logo" href="/">
                            <h2>Andresón TV PA</h2>
                        </a>
                    </div>
                    <nav className="header-nav">
                        <div className="menubar">
                            <ul className="menunav">
                            <li className="nav-link">
                                <NavLink to={ROUTES.HOME} className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink to={ROUTES.POPULAR} className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Popular
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink to={ROUTES.TOPRATED} className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Top Rated
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink to={ROUTES.UPCOMING} className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Now Playing
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink to={ROUTES.FAVORITES} className={({ isActive }) => isActive ? 'active-link' : ''}>
                                    Favorites
                                </NavLink>
                            </li>


                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default Header