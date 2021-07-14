import React, { useState, useEffect } from 'react'
import SearchResults from './Components/SearchResults'
import { FetchBoth } from '../Dashboard/api/SpotifyApi'
import './Dashboard.css'
// import PostHeader from './Components/PostHeader'
// import SpotifyWebApi from 'spotify-web-api-node'
import { RiSearchLine } from 'react-icons/ri';
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import  { userInfo, topArtists } from '../Authentication/userInfo'
import UsersTopArtists from './Components/UsersTopArtists'
// const spotifyApi = new SpotifyWebApi({
//     clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
// })

export default function Dashboard() {
    

    const [search, setSearch] = useState('');
    const [allResults, setAllResults] = useState([])
    const [userData, setUserData] = useState([])
    const [usersTopArtist, setUsersTopArtist] = useState([])

    const searchResults = (e) => {
        e.preventDefault()
        FetchBoth(search).then(results => {
            setAllResults(results)
        })
    }
    useEffect(() => {
        userInfo().then(results => { 
        setUserData(results)
        })
        topArtists().then(results => {
            setUsersTopArtist(results)
        })
    }, [])
    const searchArtist = (e) => {
        e.preventDefault();
        let search = localStorage.getItem("artist-card-search")
        FetchBoth(search).then(results => {
            console.log(results)
            setAllResults(results)
        })
        
    }
    console.log(allResults)
    
    // const userDataDropdown = (e) => {
    //     e.preventDefault()
    // }
    return (
        <div className='Dashboard'>
            <div className="navigation_bar">
                {/* <PostHeader /> */}
                <div className="user_info">
                    <button className="user_button">
                        <IoIosArrowDropdownCircle className="hamburger_dropdown"/>
                    </button>
                    <button className="filler_button">{userData.name}</button>
                    <button className="pfp_wrapper">
                        <img src={userData.profilePicture} className="profile_picture" /> 
                    </button>  
                </div>
                <form onSubmit={searchResults}className="SearchBar">
                    <input
                        type="text"
                        placeholder="  Search an artist"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button type="submit"><RiSearchLine className="searchicon"/></button>
                </form>
            </div>
            <div className="usersTopArtists">
                {usersTopArtist.map(artists => {
                    return (
                    <button type="submit" onClick={searchArtist}className="top-artists-container">
                    <UsersTopArtists key={artists.id} artists={artists} />
                    </button>  
                    )
                })}
            </div>
            <div className="SearchResults">
                <div className="mappedresults">
                    {allResults.map(track => {
                        return (<SearchResults key={track.id} track={track} /> )
                    })}
                </div>
            </div>
        </div>
    )
}
