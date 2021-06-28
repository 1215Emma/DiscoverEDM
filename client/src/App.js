import React from 'react'
import './App.css'
import LandingSearch from './Main/LandingSearch'
import SideNavBar from './Components/SideNavBar'
import Header from './Main/Header'
import Login from './TokensAndLogin/Login'

const code = new URLSearchParams(window.location.search).get('code')

const code2 = localStorage.getItem("code")

const accessToken = localStorage.getItem("access_token")

const App = () => {

    return (
        <div>
            <SideNavBar />
            <div className="container">
                <div className='Header'>
                    <Header />
                    {code ? <LandingSearch code={code} /> : <Login />}
                </div>
            </div>
        </div>
    )
}

export default App;
