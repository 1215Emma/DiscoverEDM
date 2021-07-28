import React from 'react'
import { DashboardProvider } from './Helper/DashboardContext'
import SearchBar from './Components/Search/SearchBar'
import Searching from './Components/Search/SearchResultsAlbumButtons'
import { AlbumButtonsProvider } from './Helper/SearchingContext'
import Sidebar from './Components/Sidebar/Sidebar'
import DisplayArtistBanner from './Components/ArtistBanner/DisplayArtistBanner'
import HideArtistBanner from './Components/ArtistBanner/HideArtistBanner'
import PlayBar from './Components/PlayBar/PlayBar'
export default function Dashboard() {
    

    return (      
            <div className='Dashboard'> 
            <div className="dashboard-no-sidebar" >         
                <DashboardProvider>
                <Sidebar />
                <SearchBar />
                <DisplayArtistBanner />
                <AlbumButtonsProvider>
                    <Searching />    
                    <HideArtistBanner />
                </AlbumButtonsProvider>
                </DashboardProvider>
                <PlayBar />              
            </div>
        </div> 
    )
}
