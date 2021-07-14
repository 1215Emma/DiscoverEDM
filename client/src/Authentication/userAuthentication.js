import { useEffect } from 'react'
import axios from "axios";

export default function UserAuth(code, credentials) {
    useEffect(() => {    
        if (credentials == null) {
            axios.post('http://localhost:3001/callback/', {
            code,
            credentials,
            
            })  
            .then(res => {   
                console.log(res.data)
                const { accessToken, expiresIn, refreshToken } = res.data || {}
                const credsObj = { 
                    accessToken,
                    expiresIn,
                    refreshToken,
                    timeTokenExpiresMS: Date.now() + (expiresIn * 1000), 
                }
                localStorage.setItem("credentials", JSON.stringify(credsObj))
                // window.history.pushState({}, null, "/")
            
            })
            .catch((err) => {
                console.log(err)
                // window.location = "/"
            })       
        }
        if (credentials) {
            // const accessToken = JSON.parse(localStorage.getItem("credentials")).accessToken;
            const refreshToken = JSON.parse(localStorage.getItem("credentials")).refreshToken;
            // const expiresIn = JSON.parse(localStorage.getItem("credentials")).expiresIn;
            const timeTokenExpiresMS = JSON.parse(localStorage.getItem("credentials")).timeTokenExpiresMS;
            if (timeTokenExpiresMS <= Date.now()) {
                axios.post('http://localhost:3001/refresh', {
                    refreshToken,
                })
                .then(res => {
                    console.log(res.data)
                    const credentials = {
                        refreshToken,
                        accessToken: res.data.accessToken,
                        expiresIn: res.data.expiresIn,
                        timeTokenExpiresMS: Date.now() + (res.data.expiresIn * 1000)
                    }
                    localStorage.setItem("credentials", JSON.stringify(credentials))
                })
                .catch((reason) => {
                    console.log(reason)
                })
            }
        }
           
    }, [code, credentials])
}