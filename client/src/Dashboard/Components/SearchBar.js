import React from 'react'
import { useSearchBar, useArtistSearch, useSetSearchBar, useArtistBanner, useArtistBannerTracks } from '../Helper/SearchBarContext'
import { RiSearchLine } from 'react-icons/ri';
const SearchBar = () => {
    
    const search = useSearchBar()
    const topArtistSearch = useArtistSearch()
    const settingSearch = useSetSearchBar()
    // const artistBanner = useArtistBanner()
    // const artistBannerTracks = useArtistBannerTracks()
    // ; hideTop20Banner(e)
    return (
        <div className="navigation_bar">
            <form onSubmit={(e) => {e.preventDefault(); topArtistSearch(search)}}className="SearchBar">
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
