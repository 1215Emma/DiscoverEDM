import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './useAuth'
import { SearchTracks } from './TrackSearchResult'
import { SearchAlbum, SearchTrack } from '../api/SpotifyApi'
import _ from 'underscore'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

export default function LandingSearch({ code }) {

    const accessToken = useAuth(code)

    const [search, setSearch] = useState('')
    const [searchAlbums, setAlbumsResults] = useState([])
    const [searchTracks, setTracksResults] = useState([])

    // This makes sure that we always have an access token.
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
    // This pulls albums only from an artist you search and returns the album cover image.
    useEffect(() => {
        async function fetchData() {
            if (!search) return setAlbumsResults([])
            if (!accessToken) return
            const albums = await SearchAlbum(accessToken, search);
            setAlbumsResults(albums)
        }
        fetchData()
    }, [search, accessToken])

    // This pulls all the songs that are attached to specific albums. 
    // I used a while loop because each api request would only give 50 results and useState was just over-writing what was pulled. So I had to pull and push them into an empty array before the next pull. 
    useEffect(() => {
        if (!search) return setTracksResults([])
        if (!accessToken) return
        async function fetchData() {
            let cancel = true
            let hasNext = true
            let Offset = 0;
            let limit = 5;
            const songArr = [];
            while (hasNext && limit > 0) {
                limit--
                const res = await spotifyApi.searchTracks(search, { limit: 50, offset: Offset })
                if (cancel === true) {
                    songArr.push(res.body.tracks.items)
                    Offset += 50
                }
                if (res.body.tracks.total <= Offset) {
                    hasNext = false
                    cancel = false
                }
            }
            const mergedSongArr = [].concat.apply([], songArr)
            console.log(mergedSongArr)
            const tracks = await SearchTrack(mergedSongArr)
            const newCombine = searchAlbums.map(combine => (
                tracks.filter(c => c.album === combine.album)))
            let finalCombine = [].concat.apply([], newCombine)
            finalCombine = [...searchAlbums, ...finalCombine]
            finalCombine = _.groupBy(finalCombine, "album")
            finalCombine = Object.values(finalCombine)
            finalCombine = [].concat.apply([], finalCombine)
            setTracksResults(finalCombine)
        }
        fetchData()
    }, [search, accessToken, searchAlbums])
    return (
        <form className='FormBox'>
            <div className='LandingSearch'>
                <input type="search" placeholder="  Search an artist" value={search} onChange={e => setSearch(e.target.value)} />
                {/* <input type="submit" value='submit' onClick={e => setSearch(e.target.value)} /> */}


                <div className='searchResults'>
                    {searchTracks.map(track => (
                        <SearchTracks track={track} key={track.id} />
                    ))}
                </div>
            </div>
        </form>
    )
}
