import React from 'react'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import { Login } from './Login/Login'

let code = new URLSearchParams(window.location.search).get('code')
    
export const App = () => {
    
    return (
        <div>
            {code ? <Dashboard /> : <Login />}
        </div>
        )
}
    


