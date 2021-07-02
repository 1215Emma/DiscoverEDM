import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from '../Authentication/useAuth'
// import SearchTracks from './Components/SearchResults'
import { fetchBoth } from '../Dashboard/api/SpotifyApi'
import _ from 'underscore'
import './Dashboard.css'
import PostHeader from './PostHeader'
// import SearchButton from './Components/SearchButton'
import App from "../App.js"
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})


export default function Dashboard() {


    const [search, setSearch] = useState('');
    const [albumCovers, setAlbumCovers] = useState([]);
    const [trackResults, setTrackResults] = useState([]);
    const [allResults, setAllResults] = useState([]);
    console.log("hello world")
    fetchBoth().then((results) => {
        console.log(results)
    })
    
    return (
        <div className='Dashboard'>
            <PostHeader />
            <form className="SearchBar">
                <input
                    type="text"
                    placeholder="  Search an artist"
                    // value={}
                    // onChange={}
                />
                <button type="submit"/>
            </form>
            {/* {search.map(searches => {
                <SearchAlbum key={searches.id} search={searches} />
            })} */}
        </div>
    )
}
