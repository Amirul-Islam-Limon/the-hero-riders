import React, { useContext } from 'react';
import './Header.css'
import {Link, Route} from 'react-router-dom'
import { UserContext } from '../../App';
const Header = () => {
    const [userInfo, setUserInfo] = useContext(UserContext)
    return (
        <div className="Header container d-flex justify-content-between">
            <div className="logo-part">
                <h3 className="primary">The Hero Riders</h3>
            </div>
            <div className="nav-part">
                <nav>
                    
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        {
                            !userInfo.displayName && <Link className="login-button" to="/login">Login</Link>
                        }
                    </li>
                    <li>
                        {
                            userInfo.displayName && <h6>{userInfo.displayName}</h6>
                        }
                    </li>
                    
                </nav>
            </div>
        </div>
    );
};

export default Header;