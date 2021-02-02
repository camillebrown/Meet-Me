import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth.service'

const Layout = (props) => {

    const [currentUser, setCurrentUser] = useState(undefined)
    useEffect(() => {
        // grab getCurrentUser from the auth service
        const user = AuthService.getCurrentUser()
        if (user) {
            //setCurrentUser to the current user state
            setCurrentUser(user);
        }
        //empty array is a listener - everytime we want something to change, we have this listener
        // the listener is empty when there's not any prerequisite to listen to
    }, [])

    const logOut = () => {
        AuthService.logOut()
    }

    return (
        <div>
            <nav className='navbar navbar-expand navbar-light'>
                <div className="container-fluid">
                    <Link to='/' className='navbar-brand'>
                        FOMO-NOMO!
                    </Link>
                    <div className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link to={'/calendar'} className='nav-link'>
                                My Calendar
                            </Link>
                        </li>
                    </div>

                    {currentUser ?
                        <div className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <Link to={'/profile'}>
                                    {currentUser.username}'s Profile
                                </Link>
                                <a href='/login' className='nav-item nav-link block' onClick={logOut}>Logout</a>
                            </li>
                        </div> :
                        <div className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <Link to={'/login'} className='nav-link'>
                                    Login
                            </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to={'/register'} className='nav-link'>
                                    Sign Up
                            </Link>
                            </li>
                        </div>

                    }
                </div>
            </nav>
            <div className='container mt-3'>
                {props.children}
            </div>
        </div>
    )
}

export default Layout
