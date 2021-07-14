import React, { useState } from 'react'
import { FetchBoth } from '../api/SpotifyApi'
const UsersTopArtists = ({artists}) => {
    const [allResults, setAllResults] = useState([])
    let search = ('')
    const searchArtist = (e) => {
        e.preventDefault();
        search = artists.name
        localStorage.setItem("artist-card-search", search)
    }
    return (
        <button type="submit" onClick={searchArtist}className="top-artists-container">
            <div className="top-artists-card">
                <img src={artists.image.url} className="artist-image" />
                <div className="artist-name">{artists.name}</div>
            </div>
        </button>    
    )
}

export default UsersTopArtists
