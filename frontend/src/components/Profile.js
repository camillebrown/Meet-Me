import React from 'react'
import AuthService from '../services/auth.service'
import { Link } from 'react-router-dom'

const Profile = () => {
    const currentUser = AuthService.getCurrentUser()

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}...{" "}
            </p>
            <p>
                <strong>ID:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
           
            
            {/* if current user has roles then map through those roles */}
            {currentUser.roles && 
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
                }
             <Link 
                to={{
                  pathname: `/`,
                  
                }} 
              >
              Home Page
              </Link>
        </div>  
    )
}




export default Profile