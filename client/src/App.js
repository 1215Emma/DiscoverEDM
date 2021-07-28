import React from 'react'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import { Login } from './Dashboard/Components/Login/Login'
import UserAuth from './Authentication/userAuthentication'
// import 'bootstrap/dist/css/bootstrap.min.css';
const code = new URLSearchParams(window.location.search).get('code')

// check localStorage for the valid tokens 
// have a function that compares the time stamp to current time and if 
// 1. Token doesn't exist => login flow

// 2. Token exist but expire => fetch refresh => DAshboard

// 3. Token exists and is valid => Dashboard
    
const App = () => {

    const isLoggedIn = () => {
        if( code || localStorage.getItem("credentials") ) { 
            const credentials = JSON.parse(localStorage.getItem('credentials'))
           
            UserAuth(code, credentials)
        return (
        <Dashboard />      
        )  
        }
        return (
        <Login />
        )
    }
    
    return (
        <div>
            {isLoggedIn()}
        </div>
        )
}
     
export default App

