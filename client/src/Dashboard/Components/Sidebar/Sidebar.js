import React from 'react'
import { useArtistSearch } from '../../Helper/DashboardContext'
import UserInfoSidebar from './UserInfoSidebar'
import '../../Dashboard.css'
function Sidebar() {
    const topArtistSearch = useArtistSearch()
    return (
        <div className="sidebar">
            <UserInfoSidebar topArtistSearch={topArtistSearch} />
                <div className="playlists-container">
                    <button className="your-playlists">
                        <h1>Your Playlists</h1>
                    </button>   
                </div>
        </div>
    )
}

export default Sidebar
