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
import UsersTopArtistsClick from './Components/UsersTopArtistsClick'
import { ArtistBanner, ArtistBannerTracks } from './Components/ArtistBanner'
import { artistBanner, artistBannerTopTracks } from './api/artistBanner'
// const spotifyApi = new SpotifyWebApi({
//     clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
// })

export default function Dashboard() {
    

    const [search, setSearch] = useState('');
    const [allResults, setAllResults] = useState([])
    const [userData, setUserData] = useState([])
    const [usersTopArtist, setUsersTopArtist] = useState([])
    const [mainArtistBanner, setMainArtistBanner] = useState([])
    const [mainArtistBannerTracks, setMainArtistBannerTracks] = useState([])
    const [showTopArtists, setShowTopArtists] = useState(true)
    
    async function searchResults(e) {
        e.preventDefault()
        await FetchBoth(search).then(results => {
            setAllResults(results)
        })
    }
    
    const searchResultsArtist = (e) => {
        e.preventDefault()
        artistBanner(search).then(results => {
            setMainArtistBanner([results])
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
    // const onClick = (e) => {
        // e.preventDefault();
      
        const topArtistSearch = (e) => {
            e.preventDefault();
            let search = localStorage.getItem("artist-card-search")
        FetchBoth(search).then(results => {
            setAllResults(results)
        })
        artistBanner(search).then(results => {
            setMainArtistBanner([results])
            artistBannerTopTracks(results).then(results => {
                setMainArtistBannerTracks(results)
            })
        })
        }
        const hideTopArtists = (e) => {
            e.preventDefault();
          setShowTopArtists(!showTopArtists)  
        }
        
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
                <form onSubmit={(e) => {searchResults(e); searchResultsArtist(e)}}className="SearchBar">
                    <input
                        type="text"
                        placeholder="  Search an artist"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button type="submit"><RiSearchLine className="searchicon"/></button>
                </form>
            </div>
            {showTopArtists ?
            <div className="top-artist-greeting">
                <h1>Your top artists</h1>
            </div>
            :
            <div className="show-top-artists">
                <h1>Show top artists</h1>
            </div>
            }       
            {/* <div className="artist-banner">
                {mainArtistBanner.map(results => {
                return <ArtistBanner key={results.id} results={results} />
                })}
            </div> */}
            
            {showTopArtists ?  
            <div className="usersTopArtists">
                {usersTopArtist.map(artists => {
                    return (
                        <button type="submit" onClick={(e) => {topArtistSearch(e); hideTopArtists(e)}}className="top-artists-container">
                            <UsersTopArtists key={artists.id} artists={artists} />
                        </button>  
                    )
                })}
            </div>
            : 
            <div className="usersTopArtists" style={{visibility: "none"}} /> 
            &&
            <div className="artist-banner">
                {mainArtistBanner.map(results => {
                return <ArtistBanner key={results.id} results={results} />
                })}
                <div className="artist-banner-tracks">
                    {mainArtistBannerTracks.map(bannerTracks => {
                    return <ArtistBannerTracks key={bannerTracks.id} bannerTracks={bannerTracks} />
                    })}
                </div>
            </div>
            }
            {/* <div className="top-artist-clicked">
               {usersTopArtist.map(artists => {  
                    return (<UsersTopArtistsClick key={artists.id} artists={artists} />)
                })}
            </div>} */}

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
