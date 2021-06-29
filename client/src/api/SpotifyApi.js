import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

// grabs api and pulls album artworks only //
export const SearchAlbum = (search) => {
    // localStorage.getItem("access_token")
    spotifyApi.setAccessToken(localStorage.getItem("access_token"))
    return spotifyApi.searchAlbums(search, { limit: 50 }).then(res => {

        return res.body.albums.items.map(album => {
            const largestAlbumImage = album.images.reduce((largest, image) => {
                if (image.height > largest.height) return image
                return largest
            }, album.images[0]);

            if (album.album_type === "album" && album.artists[0].name.toLowerCase().includes(search.toLowerCase()) && !album.name.includes("Remix")) {
                return {
                    id: album.id,
                    albumUrl: largestAlbumImage.url,
                    album: album.name,
                }
            }
            else {
                return null
            }
        }).filter(item => item != null)
    })
}

// grabs the array [mergedSongArr] that we pushed all the data from the api pull into and maps through it and returns the info we want 
export const SearchTrack = (mergedSongArr) => {
    return mergedSongArr.map(track => {

        return {
            albumUrl: track.albumUrl,
            artist: track.artists[0].name,
            title: track.name,
            id: track.id,
            albumType: track.album.album_type,
            album: track.album.name,
        }
    }).filter(item => item != null)
}