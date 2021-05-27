import React, { useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './useAuth'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

    export default function LandingSearch({ code }) {
    
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    // useEffect(() => { 
    //     if (!accessToken) return
    //     spotifyApi.setAccessToken(accessToken)
    // }, [accessToken])

    // useEffect(() => { 
    //     if (!search) return setSearchResults([])
    //     if (!accessToken) return 

    //     let cancel = false
    //     spotifyApi.searchTracks(search).then(res => {
    //         if (cancel) return 
    //         setSearchResults
    //             (res.body.tracks.items.map(track => {
    //             const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
    //                 if (image.height < smallest.height) return image
    //                 return smallest
    //             }, track.album.images[0])

    //             return {
    //                 artist: track.artists[0].name,
    //                 title: track.name,
    //                 uri: track.uri,
    //                 albumUrl: smallestAlbumImage.url
    //             }
    //         }))
    //     })

    //     return () => cancel = true
    // }, [search, accessToken])

    return (
        <form className='FormBox'>
            <div className='LandingSearch'>
                <input type="search" placeholder="  Search an artist" />
                <input type="submit" value='submit' />
                {code}
                {/* onClick={e => setSearch(e.target.value)} />    */}

                {/* <div className='searchResults'>
                    {searchResults.map(track => (
                        <p>hi</p>
                        // <TrackSearchResult track={track} key={track.uri} /> 
                    ))} */}
                {/* </div> */}
            </div>
        </form>
    )
}
