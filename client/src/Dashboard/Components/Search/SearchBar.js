import React from 'react'
import { useDashboard, useArtistSearch, useSetDashboard, useSetHideArtistBanner } from '../../Helper/DashboardContext'
import { RiSearchLine } from 'react-icons/ri';
const SearchBar = () => {
    
    const search = useDashboard()
    const topArtistSearch = useArtistSearch()
    const settingSearch = useSetDashboard()
    const setHideArtistBanner = useSetHideArtistBanner()
    
    return (
        <div className="navigation_bar">
            <form onSubmit={(e) => {e.preventDefault(); topArtistSearch(search); setHideArtistBanner(false)}}className="SearchBar">
                    <input
                    type="text"
                    placeholder="  Search an artist"
                    value={search}
                    onChange={e => settingSearch(e.target.value)}
                    />
                <button type="submit"><RiSearchLine className="searchicon"/></button>
            </form> 
        </div>            
    )
}

export default SearchBar
