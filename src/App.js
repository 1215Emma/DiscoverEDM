import React from 'react'
import './App.css'
import LandingSearch from './Components/LandingSearch'
import SideNavBar from './Components/SideNavBar'
import Header from './Components/Header'
import ArtistInfo from './Components/ArtistInfo'
const App = () => {
   
    return (   
    <div>
        <SideNavBar />  
        <div className="container">
            <div className='Header'>
                <Header />
                <LandingSearch />
            </div>
            <ArtistInfo className="ArtistInfo" />
        </div>
    </div>
    
)}

export default App;
