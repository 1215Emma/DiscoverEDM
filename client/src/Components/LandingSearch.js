import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './useAuth'
// re-add SearchTracks when you debug SearchAlbums
import { SearchAlbums } from './TrackSearchResult'
import { SearchAlbum } from './SpotifyApi'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

export default function LandingSearch({ code }) {

    const accessToken = useAuth(code)

    const [search, setSearch] = useState('')
    const [searchAlbums, setAlbumsResults] = useState([])
    // const [searchTracks, setTracksResults] = useState([])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        async function fetchData() {
            if (!search) return setAlbumsResults([])
            if (!accessToken) return

            const albums = await SearchAlbum(accessToken, search);
            setAlbumsResults(albums)
        }
        fetchData()
    }, [search, accessToken])
    console.log(searchAlbums)
    // useEffect(async () => {
    //     if (!search) return setTracksResults([])
    //     if (!accessToken) return

    //     let cancel = false
    //     let hasNext = true
    //     let Offset = 0;
    //     let limit = 5;
    //     let songArr = [];
    //     while (hasNext && limit > 0) {
    //         limit--
    //         const res = await spotifyApi.searchTracks(search, { limit: 50, offset: Offset });
    //         if (cancel) return
    //         songArr.push(...res.body.tracks.items)
    //         Offset += 50
    //         if (res.body.tracks.total <= Offset) {
    //             hasNext = false
    //         }

    //     }
    //     setTracksResults
    //         (songArr.map(track => {
    //             if (track.album.album_type === "album" && track.artists[0].name.toLowerCase().includes(search.toLowerCase()) && !track.name.includes("Remix", "Remixes") && !track.album.name.includes("Remixes", "Live", "Remix")) {
    //                 return {
    //                     artist: track.artists[0].name,
    //                     title: track.name,
    //                     id: track.id,
    //                     albumType: track.album.album_type,
    //                     album: track.album.name,
    //                 }
    //             }
    //             else {
    //                 return null
    //             }
    //         }).filter(item => item != null))
    //     return () => cancel = true
    // }, [search, accessToken])

    return (
        <form className='FormBox'>
            <div className='LandingSearch'>
                <input type="search" placeholder="  Search an artist" value={search} onChange={e => setSearch(e.target.value)} />
                {/* <input type="submit" value='submit' onClick={e => setSearch(e.target.value)} /> */}


                <div className='searchResults'>

                    {searchAlbums.map(album => (
                        <SearchAlbums album={album} key={album.albumUrl} />
                    ))}
                    {/* {searchTracks.map(track => (
                        <SearchTracks track={track} key={track.id} />
                    ))} */}
                </div>
            </div>
        </form>
    )
}
