import React from 'react'
import './App.css'
import LandingSearch from './Components/LandingSearch'
import SideNavBar from './Components/SideNavBar'
import Header from './Components/Header'
import Login from './Components/Login'
import { SearchAlbum } from './Components/SpotifyApi'

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {

    return (
        <div>
            <SideNavBar />
            <div className="container">
                <div className='Header'>
                    <Header />
                    {code ? <LandingSearch code={code} /> : <Login />}
                    <SearchAlbum code={code} />
                </div>

            </div>
        </div>

    )
}

export default App;
