import React from 'react'
import '../Dashboard.css'
import  { GrPlay } from 'react-icons/gr'
export const ArtistBanner = ({ results }) => {     
    return (
       <div className="artist-banner-container">    
            <div className="artist-banner-card"> 
                <img src={results.artistImage.url} alt="" className="artist-banner-image" />
                <div className="artist-banner-name">{results.artist}</div>
            </div>
              
        </div>
    )        
}

export const ArtistBannerTracks = ({ bannerTracks }) => {  
    const minutes = Math.floor(bannerTracks.songDuration / 60000)
    const seconds = ((bannerTracks.songDuration % 60000) / 1000).toFixed(0)
    const songDuration = minutes + ":" + (seconds < 10 ? "0" : '') + seconds
    return (
        
            <div className="banner-track-name-group">
                <div className="banner-tracks-info">
                    <div className="tracks-hover-toggle">
                        < GrPlay className="tracks-play-button" />
                        <div className="banner-track-count">{bannerTracks.countLabel}</div>
                    </div>
                    <img src={bannerTracks.AlbumImageSmall.url} alt="" className="banner-track-album-image" />
                    <div className="banner-track-name">{bannerTracks.song}</div>
                    <div className="banner-track-time">{songDuration}</div>
                </div>
            </div>
        
    )
}