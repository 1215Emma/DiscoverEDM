import React from 'react'
import UseAuth from '../Authentication/useAuthentication'
import { Login } from '../Dashboard/Components/Login/Login'
const LoginCheck = (isLoggedIn, setCredentials, code, credentials, setIsLoggedIn) => {

    if (!isLoggedIn && !code) {
        <Login />
    }
    if (!isLoggedIn && code) {
        UseAuth(code, credentials, setIsLoggedIn, setCredentials, setIsLoggedIn)
    }
}

export default LoginCheck


