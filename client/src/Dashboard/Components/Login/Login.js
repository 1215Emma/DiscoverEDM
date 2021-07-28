import React from 'react'
import './Login.css'
import LoginLogo from './LoginLogo'
// This is the login page. I defined what loginUrl is 
export const Login = () => {
    // console.log(Date.now())
    return (
        <div className="Container">
            <LoginLogo />
            <div className="LoginButton">
                <a href="http://localhost:3001/login"><button className='btn-spotify'>Login with Spotify</button></a>
            </div>
        </div>
    )
}
