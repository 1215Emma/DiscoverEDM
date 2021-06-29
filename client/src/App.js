import React from 'react'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import { Login } from './Login/Login'


const App = () => {
    const code = new URLSearchParams(window.location.search).get('code')
    
        return (
            <div>
                {code ? <Dashboard code={code} /> : <Login />}
            </div>  
        )
    }
    

export default App;
