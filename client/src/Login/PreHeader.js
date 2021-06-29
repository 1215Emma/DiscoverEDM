import React from 'react'
import logo from './images/Spotify-logo-transparent.png'
const PreHeader = () => {
    return (
        <div className='PreHeader'>
            <img src={logo} className="Spotify-logo" alt=""></img>
            <h1>Spectral Music</h1>
        </div>
    )
}


export default PreHeader