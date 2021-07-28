import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})
// API call searching artists
export const artistBanner = (search) => {
    console.log(search)
    const credentials = JSON.parse(localStorage.getItem("credentials"))
    const accessToken = credentials.accessToken
    spotifyApi.setAccessToken(accessToken)
    return spotifyApi.searchArtists(search).then(results => {
        return {
            artist: results.body.artists.items[0].name,
            artistImage: results.body.artists.items[0].images[1],
            artistId: results.body.artists.items[0].id,
            genres: results.body.artists.items[0].genres
        }
    })
}

// Api call getting top 10 tracks from artist (requires artist ID)
export const artistBannerTopTracks = (results) => {
    return spotifyApi.getArtistTopTracks(results.artistId, "US").then(results => {
            let count = 0;
        return results.body.tracks.map(topTracksInfo => {
            count++
            return {
            song: topTracksInfo.name,
            songDuration: topTracksInfo.duration_ms,
            AlbumName: topTracksInfo.album.name,
            AlbumImageSmall: topTracksInfo.album.images[2],
            AlbumImageMedium: topTracksInfo.album.images[1],
            countLabel: count,
            ArtistsInSong: topTracksInfo.artists.map(songArtists => {
                return {
                    songArtists: songArtists.name,
                    songArtistsId: songArtists.id,
                }
            }),    
            }
        })
    })
}
