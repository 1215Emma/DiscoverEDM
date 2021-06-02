import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from './useAuth'
import TrackSearchResult from './TrackSearchResult'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

export default function LandingSearch({ code }) {

    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchAlbums, setAlbumsResults] = useState([])
    const [searchTracks, setTracksResults] = useState([])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setAlbumsResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchAlbums(search, { limit: 50 }).then(res => {
            console.log(res.body.albums.items)
            if (cancel) return
            setAlbumsResults
                (res.body.albums.items.map(album => {
                    const smallestAlbumImage = album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, album.images[0]);

                    if (album.album_type === "album" && album.artists[0].name.toLowerCase().includes(search.toLowerCase())) {
                        return {
                            albumUrl: smallestAlbumImage.url,
                            album: album.name,
                        }
                    }
                    else {
                        return null
                    }
                }).filter(item => item != null))
        })
        return () => cancel = true
    }, [search, accessToken])

    useEffect(() => {
        if (!search) return setTracksResults([])
        if (!accessToken) return

        let cancel = false
        let hasNext = true
        let Offset = 0;
        let limit = 5;
        let songArr = [];
        while (hasNext && limit > 0) {
            limit--
            spotifyApi.searchTracks(search, { limit: 50, offset: Offset }).then(res => {
                if (cancel) return
                songArr.push(...res.body.tracks.items)
                Offset += 50
                if (res.body.tracks.total <= Offset) {
                    hasNext = false
                }
            })
        }
        console.log(songArr)
        setTracksResults
            (songArr.map(track => {
                if (track.album.album_type === "album" && track.artists[0].name.toLowerCase().includes(search.toLowerCase())) {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        id: track.id,
                        albumType: track.album.album_type,
                        album: track.album.name,
                    }
                }
                else {
                    return null
                }
            }).filter(item => item != null))
        return () => cancel = true
    }, [search, accessToken])

    return (
        <form className='FormBox'>
            <div className='LandingSearch'>
                <input type="search" placeholder="  Search an artist" value={search} onChange={e => setSearch(e.target.value)} />
                {/* <input type="submit" value='submit' onClick={e => setSearch(e.target.value)} /> */}


                <div className='searchResults'>

                    {searchAlbums.map(track => (
                        <TrackSearchResult track={track} key={track.album.name} />
                    ))}
                    {searchTracks.map(track => (
                        <TrackSearchResult track={track} key={track.id} />
                    ))}
                </div>
            </div>
        </form>
    )
}
