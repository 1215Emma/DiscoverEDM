import React, { useState, useEffect } from 'react'
import '../Dashboard.css'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import  { userInfo, topArtists } from '../../Authentication/userInfo'
import TimeOfDayGreeting from './TimeOfDayGreeting'
import { useSetHideArtistBanner } from '../Helper/SearchBarContext'

function UserInfoSidebar({ topArtistSearch }) {
const [userData, setUserData] = useState([]);
const [open, setOpen] = useState(false);
const [usersTopArtists, setUsersTopArtists] = useState([])

const setHideArtistBanner = useSetHideArtistBanner()

    useEffect(() => {
        userInfo().then(results => { 
        setUserData(results)
        })
        topArtists().then(results => {
            setUsersTopArtists(results)
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
                    return (
                        <button type="submit" onClick={(e) => {topArtistSearch(artists.name); setHideArtistBanner(false)}}className="your-top-20">
                            <h1>{artists.name}</h1>
                        </button>  
                    )
                })}
            </div>}
            </>
        </div> 
              
    )
}

export default UserInfoSidebar
