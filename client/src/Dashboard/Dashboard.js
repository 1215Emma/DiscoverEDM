import React, { useState, useEffect } from 'react'
import SearchResults from './Components/SearchResults'
import { FetchBoth } from '../Dashboard/api/SpotifyApi'
import './Dashboard.css'
import { RiSearchLine } from 'react-icons/ri';
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import  { userInfo, topArtists } from '../Authentication/userInfo'
// import { UsersTopArtists } from './Components/UsersTopArtists'
// import UsersTopArtistsClick from './Components/UsersTopArtistsClick'
import { ArtistBanner, ArtistBannerTracks } from './Components/ArtistBanner'
import { artistBanner, artistBannerTopTracks } from './api/artistBanner'
import UserInfoSidebar from './Sidebar/UserInfoSidebar'
import { ThemeProvider } from './Helper/ThemeContext'
import albumBannerTracks from './Components/albumBannerTracks';
import AlbumBannerTracksJSX from './Components/AlbumBannerTracksJSX';
import { useTheme, useThemeUpdate } from './Helper/ThemeContext'
import { SearchBarProvider } from './Helper/SearchBarContext'
import SearchBar from './Components/SearchBar'
import Searching from './Components/Searching'
import { AlbumButtonsProvider } from './Helper/SearchingContext'
import Sidebar from './Sidebar/Sidebar'
import DisplayArtistBanner from './Components/DisplayArtistBanner'
import HideArtistBanner from './Components/HideArtistBanner'
// const spotifyApi = new SpotifyWebApi({
//     clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
// })
export default function Dashboard() {
    
    const [search, setSearch] = useState('');
    const [allResults, setAllResults] = useState([])
    const [mainArtistBanner, setMainArtistBanner] = useState([])
    const [mainArtistBannerTracks, setMainArtistBannerTracks] = useState([])
    const [hideTop20, setHideTop20] = useState(false)
    const [hideArtistProfile, setHideArtistProfile] = useState(false)
    const [buttonArtists, setButtonArtists] = useState([])
  
    const hideTop20Banner = () => {
    setHideTop20(true)
}

    const topArtistSearch = (e) => {
        FetchBoth(e).then(results => {
        setAllResults(results)
        })
        artistBanner(e).then(results => {
            setMainArtistBanner([results])
            artistBannerTopTracks(results).then(results => {
            setMainArtistBannerTracks(results)
            })
        })
    }
    
    
    return (      
            <div className='Dashboard'> 
            
            
            
            <div className="dashboard-no-sidebar" >
                
                <SearchBarProvider>
                <Sidebar />
                <SearchBar />
                <DisplayArtistBanner />
                <AlbumButtonsProvider>
                    <Searching />    
                    <HideArtistBanner />
                </AlbumButtonsProvider>
                </SearchBarProvider>
                            
                              
            
                
                
            </div>
        </div> 
    )
}
