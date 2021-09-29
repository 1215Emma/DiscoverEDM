import React, { useState, useReducer }from 'react'
import './App.css'
import { Login } from './Dashboard/Components/Login/Login'
import UseAuth from './Authentication/useAuthentication'
import { Sidebar } from '../src/Dashboard/Components/Sidebar/Sidebar'
import  { MusicContainer } from '../src/Dashboard/Components/Music Data Display/MusicContainer'
import { PlayBar } from '../src/Dashboard/Components/PlayBar/PlayBar'
import { Home } from '../src/Dashboard/Components/Home/Home'
const code = new URLSearchParams(window.location.search).get('code')

// check localStorage for the valid tokens 
// have a function that compares the time stamp to current time and if 
// 1. Token doesn't exist => login flow

// 2. Token exist but expire => fetch refresh => DAshboard

// 3. Token exists and is valid => Dashboard
    
const initialState = {
    artistIdentifier: "",
    playbarArtistData: [],
    playState: false,
    trackClicked: false,
    queueIndex: 0,
    timeoutIndex: null,
    showHome: true,
}
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [artistIdentifier, setArtistIdentifier] = useState("")    
    // const [playbarArtistData, setPlaybarArtistData] = useState([])
    // const [playState, setPlayState] = useState(false)
    // const [trackClicked, setTrackClicked] = useState(false)
    // const [queueIndex, setQueueIndex] = useState(0)
    // const [timeoutIndex, setTimeoutIndex] = useState()
    // const [showHome, setShowHome] = useState(true);
    const storageCredentials = JSON.parse(localStorage.getItem("credentials"))

    if (code || storageCredentials === null) {
        UseAuth(code)
    }
    const isLoggedIn = () => {
        if (storageCredentials !== null) { 
            UseAuth()
            const accessToken = storageCredentials.accessToken
            return (
                <div className='Dashboard'> 
                    <div className="dashboard-no-sidebar" >       
                        <Sidebar setArtistIdentifier={setArtistIdentifier} accessToken={accessToken} setTrackClicked={setTrackClicked} setShowHome={setShowHome}/>

                        {!showHome ? 
                        <MusicContainer artistIdentifier={artistIdentifier} setPlaybarArtistData={setPlaybarArtistData} playbarArtistData={playbarArtistData} accessToken={accessToken} setPlayState={setPlayState} setQueueIndex={setQueueIndex} playState={playState} trackClicked={trackClicked} setTrackClicked={setTrackClicked} setShowHome={setShowHome}/> :
                        
                        <Home accessToken={accessToken} setArtistIdentifier={setArtistIdentifier} setTrackClicked={setTrackClicked} showHome={showHome} setShowHome={setShowHome}/>               
                        }
                        <PlayBar playbarArtistData={playbarArtistData}  accessToken={accessToken} setTimeoutIndex={setTimeoutIndex} timeoutIndex={timeoutIndex} playState={playState} setPlayState={setPlayState} setPlaybarArtistData={setPlaybarArtistData} setQueueIndex={setQueueIndex} queueIndex={queueIndex}/> 
                    </div>
                </div> 
            )
        }
        else {
            return (
                <Login />
            )
        }
    }
    return (
        <>
        {isLoggedIn()}
        </>
    )
}
export default App
//     if (code && JSON.parse(localStorage.getItem("credentials") == null)) {
//         UseAuth(code)
//     }
//     if (JSON.parse(localStorage.getItem("credentials")) !== null) {
//         if (JSON.parse(localStorage.getItem("credentials")) == null) {
//             return (
//             <Login />
//             )
//         }
//         else {
//             const storageCredentials = JSON.parse(localStorage.getItem("credentials"))
//             const accessToken = storageCredentials.accessToken
//             return (      
//             <div className='Dashboard'> 
//                 <div className="dashboard-no-sidebar" >       
//                     <Sidebar setArtistIdentifier={setArtistIdentifier} accessToken={accessToken} />
//                     <MusicContainer artistIdentifier={artistIdentifier} setPlaybarMetadata={setPlaybarMetadata} setCurrentTrack={setCurrentTrack} currentTrack={currentTrack} setQueueList={setQueueList} accessToken={accessToken}/>                
//                     <PlayBar playbarMetadata={playbarMetadata} currentTrack={currentTrack} queueList={queueList} accessToken={accessToken}/> 
//                 </div>
//             </div> 
//         )
//         }
//     }
//     else {
//         return (
            
//         <Login />
        
//         )
//     }
// }
     


