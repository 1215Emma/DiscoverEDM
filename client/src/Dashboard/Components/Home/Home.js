import React, { useState, useEffect } from 'react'
import { usersTopArtists } from '../../../lib/api'
import './Home.css'
export const Home = ({accessToken, setArtistIdentifier, setTrackClicked, setShowHome}) => {
const [topArtists, setUsersTopArtists] = useState([])


    useEffect(() => {
        usersTopArtists(accessToken, setUsersTopArtists)
    }, [accessToken])

    const top20Button = (e) => {
      setArtistIdentifier(e)
    }
    
    return (
        <div className="users-top-artists-main-container">
                <h1 className="users-favorite-artists-header">Your favorite artists</h1>
            <div className="users-top-artists-container">
                {topArtists.map(artists => {
                    const search = (artists.name)
                    return (
                        <button type="submit" onClick={e => {top20Button(search); setTrackClicked(false); setShowHome(false)}}className="users-top-artists" key={artists.id}>
                            <img className="fav-artist-image" src={artists.image.url} />
                            <h1>{search}</h1>
                        </button>  
                    )
                })}
            </div>
            </div>
    )
}

