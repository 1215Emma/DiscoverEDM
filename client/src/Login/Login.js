import React from 'react'
import { loginUrl } from './SpotifyAuth'
import PreHeader from './PreHeader'
import './Login.css'
// This is the login page. I defined what loginUrl is 
export const Login = () => {
    
    return (
        <div className="Container">
            <PreHeader />
            <div className="LoginButton">
                <a href={loginUrl}><button className='btn-spotify'>Login with Spotify</button></a>
            </div>
        </div>
    )
}

