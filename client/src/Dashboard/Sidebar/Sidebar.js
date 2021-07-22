import React from 'react'
import { useArtistSearch, useHideArtistBanner } from '../Helper/SearchBarContext'
import UserInfoSidebar from './UserInfoSidebar'
function Sidebar() {
    const topArtistSearch = useArtistSearch()
    const hideArtistBanner = useHideArtistBanner()
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
