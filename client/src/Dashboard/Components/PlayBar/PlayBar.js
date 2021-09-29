import React, { useState, useEffect, useRef, useMemo } from 'react'
import './Playbar.css'
import { GiPreviousButton, GiNextButton, GiPlayButton, GiPauseButton, GiSlicedBread } from 'react-icons/gi'
import { RiRepeatFill, RiShuffleFill, RiVolumeMuteFill, RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri'
import { playTrack, pauseTrack, resumeTrack, changeVolume, changePositionMs } from '../../../lib/api'
import { RuntimeCounter } from '../PlayBar/Runtime'

export const PlayBar = ({ playbarArtistData, accessToken,setTimeoutIndex, timeoutIndex, playState, setPlayState, setPlaybarArtistData, queueIndex, setQueueIndex}) => { 
    const [deviceData, setDeviceData] = useState([])
    const [pause, setPause] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [shuffleActive, setShuffleActive] = useState(false)
    const [volume, setVolume] = useState(50)
    const [durationMs, setDurationMs] = useState(0)
    const [totalDurationMs, setTotalDurationMs] = useState(0)
    const runtimeRef = useRef()
    
    
    console.log("outside loop test")
    const updateState = function(call_back) {
        console.log(playbarArtistData, "IN UPDATE STATE")
            setTimeout(function() {
                console.log("0ms")
                call_back()
            })
    }   
    
    const isPlaying = useMemo(() => {
         if (playbarArtistData.length !== 0 && playState && !shuffle) {
            console.log("playing first time")
            clearTimeout(timeoutIndex)
            updateState(function() {playNextSong(playbarArtistData, queueIndex, setTotalDurationMs, accessToken, repeat, setTimeoutIndex, setQueueIndex, setPlayState)});
        }
        if (shuffle) {
            shuffleList()
        }
    }, [queueIndex, playState])
    useEffect(() => {
        console.log("track is starting to play")
    }, [isPlaying])
    
    // const playNextSong = () => { 
    //     if (repeat) {
    //         const uri = playbarArtistData[queueIndex].uri
    //         const songLength = playbarArtistData[queueIndex].duration_ms 
    //         setTotalDurationMs(songLength)
    //         playTrack(accessToken, uri)
    //         const timeoutId = setTimeout(() => {
    //             playNextSong();
    //         }, songLength)
    //         setTimeoutIndex(timeoutId)
    //     } 
    //      else {   
    //         if (queueIndex >= 0 && queueIndex <= playbarArtistData.length - 1) {
    //             const uri = playbarArtistData[queueIndex].uri
    //             const songLength = playbarArtistData[queueIndex].duration_ms 
    //             setTotalDurationMs(songLength)
    //             playTrack(accessToken, uri)
    //             const timeoutId = setTimeout(() => {
    //                 setQueueIndex(queueIndex => queueIndex + 1)
    //             }, songLength)
    //             setTimeoutIndex(timeoutId)
    //         }
            
    //         if (queueIndex > playbarArtistData.length - 1) {
    //             console.log("playqueue ended")
    //             setPlayState(false)
    //             setQueueIndex(0)
    //         }
    //     }
    // }
     const artistNames = () => {
        let output = ""
        for (let i = 0; i < playbarArtistData[queueIndex].artists.length; i++) {
            let artistName = playbarArtistData[queueIndex].artists[i].name
            output += artistName
            if (i < playbarArtistData[queueIndex].artists.length - 1) {
                output +=  ", "
            }
            output+= ""
            
        }
        return output
    }
    const trackData = () => {
        if (playState && playbarArtistData.length > 0 && queueIndex <= playbarArtistData.length - 1) {
            return (
                <div className="playbar-current-track">  
                    <img className="now-playing-album-cover" src={playbarArtistData[queueIndex].album.images[1].url}></img>
                    
                    <div className="now-playing-track">{playbarArtistData[queueIndex].name}</div>
                    <div className="now-playing-artists">{artistNames()}</div>       
                </div>
            )
        }
        else {
            return (
                <div style={{fill: "white"}} className="playbar-current-track">showing nothing</div>
            )
        }
    }


    const skipTrack = () => {
        setQueueIndex(queueIndex => queueIndex + 1)
        clearTimeout(timeoutIndex)
        if (queueIndex >= playbarArtistData.length - 1) {
            pauseSong()
            setPlayState(false)
            setQueueIndex(0)
        }
    }
    const previousTrack = () => {
        if (queueIndex >= 1) {
            setQueueIndex(queueIndex => queueIndex - 1)
            clearTimeout(timeoutIndex)
        }
        if (queueIndex < 1) {
            updateState(function() {playNextSong()});
            clearTimeout(timeoutIndex)
        }
    }
    const pauseSong = () => {
        setPause(true)
        clearTimeout(timeoutIndex)
        pauseTrack(accessToken)
    }

    const playSong = () => {
        setPause(false)
        clearTimeout(timeoutIndex)
        resumeTrack(accessToken)
    }
    const shuffleList = () => {
        if (shuffleActive) {
            playbarArtistData.sort(() => Math.random() -0.5); 
            setQueueIndex(0)
            setShuffle(false)
        }
        else {
            clearTimeout(timeoutIndex)
            updateState(function() {playNextSong()});
        }
    }
    
    useEffect(() => {
        if (playState) {
            changeVolume(accessToken, volume)
        }
    }, [volume])

    const seekPosition = () => {
        changePositionMs(accessToken, durationMs)
    }
    
    const trackDuration = () => {
        let totalTrackDuration = totalDurationMs/1000
        let trackMinutes = Math.floor(totalTrackDuration/60)
        let trackSeconds = Math.floor(totalTrackDuration%60)
        if (trackSeconds < 10) {
            trackSeconds = "0" + trackSeconds
        }
        let trackDuration = trackMinutes + ":" + trackSeconds
        return (
            <div className="song-length-number">
                {trackDuration}
            </div>
        )
    }

    function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};  

    return (
            <div className="playbar">
            <div className="playbar-container">
                {trackData()}
                <div className="playbar-play-controls">
                    <div className="playbar-play-icons">
                        <button className="shuffle-button" onClick={() => {setShuffleActive(!shuffleActive); setShuffle(true)}}> 
                        {!shuffleActive ?
                            <RiShuffleFill className="shuffle-button-icon"style={{fill: "white"}}/> :
                            <RiShuffleFill className="shuffle-button-icon"style={{fill: "green"}}/>
                        }
                        </button>
                        <button className="previous-button" onClick={() => {previousTrack()}}>
                            <GiPreviousButton className="previous-button-icon"style={{fill: "white"}} />
                        </button>
                        <button className="pause-play-button" >
                            {playState ? <GiPauseButton className="track-pause-button" onClick={ () => {pauseSong()}} style={{fill: "white"}}/> : <GiPlayButton className="track-play-button" onClick={ () => { playSong()}}style={{fill: "white"}} />}
                        </button>    
                        <button className="next-button" onClick={() => {skipTrack()}}>
                            <GiNextButton className="next-button-icon" style={{fill: "white"}} />
                        </button>
                        <button className="repeat-button" onClick={() => setRepeat(!repeat)} > 
                        {!repeat ? 
                        <RiRepeatFill className="repeat-button-icon" style={{fill: "white"}} /> :
                        <RiRepeatFill className="repeat-button-icon" style={{fill: "green"}} />
                        }
                        </button>
                    </div>
                    <div className="song-length-bar">
                    <div className="song-length-time-start">
                        <div className="song-length-timer">
                            <RuntimeCounter totalDurationMs={totalDurationMs} />
                        </div>
                    </div>
                        <input 
                        ref={runtimeRef}
                        type="range"
                        min={0}
                        max={totalDurationMs}
                        value={durationMs}
                        step={1000}
                        onChange={event => {
                            setDurationMs(event.target.valueAsNumber)
                        }}
                        onMouseUp={() => {
                            seekPosition(durationMs)
                        }} 
                        className="song-length-slider"/>
                    <div className="song-length-time">
                        {trackDuration()}
                    </div>
                    </div>
                </div>
            <div className="playbar-volume-container">
                {volume >= 40 ? 
                <RiVolumeUpFill className="volume-button" style={{fill: "white"}}/> : 
                volume == 0 ? 
                    <RiVolumeMuteFill className="volume-button" style={{fill: "white"}}/> :
                    <RiVolumeDownFill className="volume-button" style={{fill: "white"}}/>
                
                }
                <div className="volume-bar">
                    <input 
                    type="range" 
                    min={0}
                    max={100} 
                    value={volume} 
                    step={5}
                    onChange={event => {
                        setVolume(event.target.valueAsNumber)
                    }}
                    className="volume-slider" />
                    
                </div>
                
            </div>
            </div>
        </div>
    )
}


const playNextSong = (playbarArtistData, queueIndex, setTotalDurationMs, accessToken, repeat, setTimeoutIndex, setQueueIndex, setPlayState) => { 
        if (repeat) {
            const uri = playbarArtistData[queueIndex].uri
            const songLength = playbarArtistData[queueIndex].duration_ms 
            setTotalDurationMs(songLength)
            playTrack(accessToken, uri)
            const timeoutId = setTimeout(() => {
                playNextSong();
            }, songLength)
            setTimeoutIndex(timeoutId)
        } 
         else {   
            if (queueIndex >= 0 && queueIndex <= playbarArtistData.length - 1) {
                const uri = playbarArtistData[queueIndex].uri
                const songLength = playbarArtistData[queueIndex].duration_ms 
                setTotalDurationMs(songLength)
                playTrack(accessToken, uri)
                const timeoutId = setTimeout(() => {
                    setQueueIndex(queueIndex => queueIndex + 1)
                }, songLength)
                setTimeoutIndex(timeoutId)
            }
            
            if (queueIndex > playbarArtistData.length - 1) {
                console.log("playqueue ended")
                setPlayState(false)
                setQueueIndex(0)
            }
        }
    }