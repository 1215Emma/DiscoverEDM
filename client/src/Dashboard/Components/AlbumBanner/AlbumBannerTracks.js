import React from 'react'
import  { GrPlay } from 'react-icons/gr'

function AlbumBannerTracks({ albumSongs }) {
    return (
        <div className="album-banner-container">
            <div className="album-banner-card">
                <img src={albumSongs.albumUrl} className="album-banner-image"/>
                <div className="album-banner-name">{albumSongs.albumName}</div>
            </div>
            <div className="album-songs-container">
            {albumSongs.tracks.map(tracks => {
                console.log(tracks)
                const minutes = Math.floor(tracks.songLength / 60000)
            const seconds = ((tracks.songLength % 60000) / 1000).toFixed(0)
            const songDuration = minutes + ":" + (seconds < 10 ? "0" : '') + seconds
                return (
                <div className="album-banner-tracks">
                    <div className="banner-track-name-group">
                        <div className="banner-tracks-info">
                            <div className="tracks-hover-toggle">
                            < GrPlay className="tracks-play-button" />
                            <div className="banner-track-count">
                            {tracks.trackNumber}
                            </div> 
                            </div>
                             
                            <div className="banner-track-name">{tracks.songName}</div> 
                            <div className="banner-track-time">{songDuration}</div>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default AlbumBannerTracks
