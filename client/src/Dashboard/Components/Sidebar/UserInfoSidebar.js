import React, { useState, useEffect } from 'react'
import TimeOfDayGreeting from './TimeOfDayGreeting'
import { useSetHideArtistBanner, useArtistSearch } from '../../Helper/DashboardContext'
import axios from 'axios';

function UserInfoSidebar({ topArtistSearch }) {
const [userData, setUserData] = useState([]);
const [open, setOpen] = useState(false);
const [usersTopArtists, setUsersTopArtists] = useState([])

const setHideArtistBanner = useSetHideArtistBanner()
const artistSearch = useArtistSearch()
    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem("credentials"))
    const accessToken = credentials.accessToken
        axios.post("http://localhost:3001/user", {
            accessToken
        }).then(res => {
            setUserData(res.data)
        })
        axios.post("http://localhost:3001/topArtists", {
            accessToken
        }).then(res => {
            setUsersTopArtists(res.data.topArtists)
        })
    }, [])
    return (
            
        <div className="sidebar-container">  
            <div className="user_info">                
                <button className="user_button">                
                    {/* <IoIosArrowDropdownCircle className="hamburger_dropdown"/> */}   
                    <div className="filler_button">
                        {TimeOfDayGreeting()} {userData.firstName}
                    </div>         
                    <div className="pfp_wrapper">
                        <img src={userData.profilePicture} alt="" className="profile_picture" /> 
                    </div> 
                </button>   
            </div>
            
            <div className="Top-20-container">
                <button className="your-top-20" onClick={() => setOpen(!open)}>
                    <h2 className="your-top-20-header">Your Top 20</h2>
                </button> 
                
            </div>
            <>
            { open &&   
            <div className="your-top-20-container">
                {usersTopArtists.map(artists => {
                    const search = (artists.name)
                    return (
                        <button type="submit" onClick={(e) => {artistSearch(search); setHideArtistBanner(false)}}className="your-top-20">
                            <h1>{search}</h1>
                        </button>  
                    )
                })}
            </div>}
            </>
        </div> 
              
    )
}

export default UserInfoSidebar
