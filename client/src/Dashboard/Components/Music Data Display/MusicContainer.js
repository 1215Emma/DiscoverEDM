import React, { useState, useEffect, useRef } from 'react'
import './MusicContainer.css'
import  { GrPlay } from 'react-icons/gr'
import { searchAlbums, searchArtists, trackData } from '../../../lib/api'

// The music container. Parent function
export const MusicContainer = ( {artistIdentifier, setPlaybarArtistData, playbarArtistData, accessToken, setPlayState, setQueueIndex, playState, trackClicked, setTrackClicked, setShowHome}) => {
    const [artistData, setArtistData] = useState([])
    const [albumClicked, setAlbumClicked] = useState(false)
    const [albumClickedData, setAlbumClickedData] = useState([])
    let artistRef = useRef(artistIdentifier)
    useEffect(() => {
        if (artistRef) {
            setArtistData([])
            setAlbumClickedData([])
            setAlbumClicked(false)
            setShowHome(false)
            setTimeout(() => {
                searchAlbums(artistIdentifier, accessToken, setArtistData)
                searchArtists(artistIdentifier, accessToken, setArtistData)
            }, 250)
        }
    }, [artistRef, accessToken])
    
    useEffect(() => {
        if (artistData.length > 2) {
            convertMetadata()
        }
    }, [artistData, albumClicked, trackClicked])
   
    const convertMetadata = () => {
        const trackIds = []
        // the user has NEVER clicked an album
        if (!albumClicked && !playState && !trackClicked) {
            const artistTopTracks = artistData.find(trackInfo => {
                return trackInfo.topTracks
            })
                artistTopTracks.topTracks.map(topTracks => {
                return trackIds.push(topTracks.id)
            })
            trackData(accessToken, trackIds, setPlaybarArtistData)
            setTrackClicked(false)
        }
        // the user has clicked an album which you can only get to from clicking an artist
        if (albumClickedData && albumClicked && playState && trackClicked) {
            const trackIds = []
            albumClickedData.tracks.items.map(albumTracks => {
                return trackIds.push(albumTracks.id)
            })
            trackData(accessToken, trackIds, setPlaybarArtistData)
            setTrackClicked(false)

        }
        if (!albumClicked && playState && trackClicked) {
            const artistTopTracks = artistData.find(trackInfo => {
                return trackInfo.topTracks
            })
                artistTopTracks.topTracks.map(topTracks => {
                return trackIds.push(topTracks.id)
            })
            trackData(accessToken, trackIds, setPlaybarArtistData)
            setTrackClicked(false)
        }
    }


    return (
        <div className="music-container">
            <MusicContainerHeader  artistData={artistData} albumClicked={albumClicked} albumClickedData={albumClickedData}/>   
            <div className="music-container-tracks">
                <MusicContainerTracks artistData={artistData} albumClicked={albumClicked} albumClickedData={albumClickedData} setPlaybarArtistData={setPlaybarArtistData} accessToken={accessToken} setPlayState={setPlayState} setQueueIndex={setQueueIndex} setTrackClicked={setTrackClicked}/>
            </div>
            <div className="music-container-albums">
                <MusicContainerAlbums artistData={artistData} setAlbumClicked={setAlbumClicked} setAlbumClickedData={setAlbumClickedData} albumClicked={albumClicked} setTrackClicked={setTrackClicked} /> 
            </div>
        </div>
    )
}

// Displays the header with image and name of the music container. Child 1
export const MusicContainerHeader = ({ artistData, albumClicked, albumClickedData }) => { 
   const artistDataInfo = artistData.find(artistInfo => {
        return artistInfo.searchedArtists
    })
    return (
        <>
        {artistDataInfo === undefined ? 
        <></> : 
        (albumClickedData && albumClicked ? 
        <div className="music-container-header">    
            <div className="music-header"> 
                <img src={albumClickedData.images[0].url} alt="" className="music-image" />
                <div className="music-name">{albumClickedData.name}</div>
            </div>
        </div> : 
        <div className="music-container-header">    
            <div className="music-header"> 
                <img src={artistDataInfo.searchedArtists.artistImage.url} alt="" className="music-image" />
                <div className="music-name">{artistDataInfo.searchedArtists.artist}</div>
            </div>
        </div>)
        }
        </>
    )        
}


// Displays the albums component of the music container. Child 2
export const MusicContainerAlbums = ({ artistData, setAlbumClicked, setAlbumClickedData, albumClicked, setTrackClicked }) => {
    
    const artistAlbums = artistData.find(albums => {
        return albums.searchedAlbums
    })

    return (
        <>
        {artistAlbums === undefined ? <></> : 
        <div className="music-container-albums-main">
            {artistAlbums.searchedAlbums.map(albums => {
                if (albums.name.length > 19) {
                    albums.name = albums.name.slice(0, 22) + "..."
                }
                return (
                    <button onClick={e => {
                    setAlbumClicked(true); setAlbumClickedData(albums); setTrackClicked(false)}} className="music-container-albums-button" >
                        <div className="music-albums-individual-container">   
                            <img src={albums.images[1].url} alt="" className="music-album-cover"/>
                            <div className="music-album-name">{albums.name}</div>
                        </div>
                     </button>
                )
            })} 
        </div>
        }
        </>
    )
                    
}

// Displays tracks component of the music container. Child 3
export const MusicContainerTracks = ({ artistData, albumClicked, albumClickedData, setPlaybarArtistData,setPlayState,setQueueIndex, setTrackClicked }) => {  
    
    const artistTopTracks = artistData.find(trackInfo => {
        return trackInfo.topTracks
    })
    const SongDuration = (x) => {
        const minutes = Math.floor(x / 60000)
        const seconds = ((x % 60000) / 1000).toFixed(0)
        const songDur = minutes + ":" + (seconds < 10 ? "0" : '') + seconds
        return (
            songDur
        )
    }
    return (
        <>
        {artistTopTracks === undefined ? 
        <></> : 
        
        (albumClickedData && albumClicked ? 
        albumClickedData.tracks.items.map((track, index) => {
            
        const songDuration = SongDuration(track.duration_ms)
        return (
        <button className="music-track-buttons-container" onClick={() => {setPlayState(true); setQueueIndex(index); setTrackClicked(true)}} >
            <div className="music-track-info-container">
                <div className="music-track-hover-display">
                    < GrPlay className="music-track-play-button" />
                    <div className="music-track-count">{index + 1}</div>
                </div>
                <div className="music-track-name">{track.name}</div>
                <div className="music-track-runtime">{songDuration}</div>
            </div>
        </button>
        )
        
        }) :
        artistTopTracks.topTracks.map((topTrackResults, index) => {
        
        const songDuration = SongDuration(topTrackResults.duration_ms)
        return (
        <button className="music-track-buttons-container" onClick={() => {setPlayState(true); setQueueIndex(index); setTrackClicked(true)}}>
            <div className="music-track-info-container">
                <div className="music-track-hover-display">
                    < GrPlay className="music-track-play-button" />
                    <div className="music-track-count">{index + 1}</div>
                </div>
                <img src={topTrackResults.album.images[2].url} alt="" className="banner-track-album-image" />
                <div className="music-track-name">{topTrackResults.name}</div>
                <div className="music-track-runtime">{songDuration}</div>
            </div>
        </button>
        )
        
        })
        )
        
        }
        </>
    )
}





