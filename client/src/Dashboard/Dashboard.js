import React, { useState } from 'react'
import { Sidebar } from './Components/Sidebar/Sidebar'
import  { MusicContainer } from './Components/Music Data Display/MusicContainer'
import { PlayBar } from './Components/PlayBar/PlayBar'
import { Login } from '../Dashboard/Components/Login/Login'

export default function Dashboard({isLoggedIn}) {  
const [artistIdentifier, setArtistIdentifier] = useState("")    
const [playbarMetadata, setPlaybarMetadata] = useState('')
const [currentTrack, setCurrentTrack] = useState([])
const [queueList, setQueueList] = useState([])
    console.log(isLoggedIn)
    if (isLoggedIn) {
        return (      
            <div className='Dashboard'> 
                <div className="dashboard-no-sidebar" >       
                    <Sidebar setArtistIdentifier={setArtistIdentifier} />
                    <MusicContainer artistIdentifier={artistIdentifier} setPlaybarMetadata={setPlaybarMetadata} setCurrentTrack={setCurrentTrack} currentTrack={currentTrack} setQueueList={setQueueList}/>                
                    <PlayBar playbarMetadata={playbarMetadata} currentTrack={currentTrack} queueList={queueList}/> 
                </div>
            </div> 
        )
    }
    else {
        <Login />
    }
}

