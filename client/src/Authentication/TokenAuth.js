import React, {useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './useAuth'

const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

const TokenAuth = () => {
    
    let code = new URLSearchParams(window.location.search).get('code')
    const accessToken = useAuth(code)
    let isExpired = false;
    let Time = new Date().toLocaleString('en-US', {hour12: false})
        Time = Time.match(/\d+/g).join("")
        console.log(Time)
        if (!accessToken) { 
            isExpired = true; 
            
            spotifyApi.setAccessToken(accessToken)
            
            isExpired = false;
        }
        if (AToken == accessToken) {
            isExpired = false;
            spotifyApi.setAccessToken
        }
    
    
}

export default TokenAuth
