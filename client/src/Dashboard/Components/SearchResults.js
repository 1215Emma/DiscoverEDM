import React from 'react'
import '../Dashboard.css'

const SearchResults = ({ track }) => {
    const setResultDivs = () => {
        if (track.albumUrl) {
            const itemArr = track.tracks
            return (
                <div className="ArtistCards">
                    <div className="albumCover">
                    <img src={track.albumUrl} alt="" />
                    </div>
                    <div className="songCards">
                        {itemArr.map(results => {
                            return (
                                <div className="songsInAlbum">
                                    <div className="songsInAlbumCombined">
                                        <div className="songName">{results.name}</div>
                                        <div className="artistName">{results.artists[0].name}</div>
                                    </div>
                                </div>
                            )
                        })}    
                    </div>
                </div>
            )
        }                 
    }

            
    
    return ( 
        
            setResultDivs()
        
    )
}

export default SearchResults

