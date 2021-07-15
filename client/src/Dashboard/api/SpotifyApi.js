import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

export async function FetchBoth(search) {
    const credentials = JSON.parse(localStorage.getItem("credentials"))
    const accessToken = credentials.accessToken
    spotifyApi.setAccessToken(accessToken)
    // console.log(spotifyApi.searchAlbums(search, { limit: 50 }))
    const getAlbums = spotifyApi.searchAlbums(search, { limit: 50 }).then(res => {
        return res.body.albums.items.map(album => {
            const largestAlbumImage = album.images.reduce((largest, image) => {
            if (image.height > largest.height) return image
            return largest
            }, album.images[0]);
            const albumName = album.name.toLowerCase()
            const albumArtist = album.artists[0].name.toLowerCase()
            const totalTracks = album.total_tracks
            if (
            (album.album_type === "album" || (totalTracks > 3))
            && !albumName.includes("deluxe") 
            && !albumName.includes("live") 
            && !albumName.includes("remix") 
            && !albumName.includes("version") 
            && !albumName.includes("medley") 
            && !albumName.includes("radio") 
            && !albumName.includes("tour") 
            && !albumName.includes("playlist") 
            && !albumName.includes("feat")  
            && !albumName.includes("edition") 
            && !albumName.includes("ukuleke") 
            && !albumName.includes("quartet") 
            && !albumName.includes("renditions") 
            && !albumName.includes("edited") 
            && !albumName.includes("piano") 
            && !albumName.includes("performs") 
            && albumArtist === search.toLowerCase()) {
                return {
                    id: album.id,
                    albumUrl: largestAlbumImage.url,
                    album: album.name,
                    totalTracks: album.total_tracks
                }
            }
            else {
                return null
            }
        }).filter(item => item != null) 
    })
    return getAlbums.then(results => {  
        const newArr = [];
        for (let i = 0; i < results.length; i++) {
            if (results[i].albumUrl) {
                newArr.push(results[i].id)
            }
        }
        
        return spotifyApi.getAlbums(newArr).then(results => {
            const albums = results.body.albums
            const uniqueAlbums = [...albums.reduce((map, obj) => map.set(obj.name, obj),new Map()).values()];
            return uniqueAlbums.map(album => {
                const largestAlbumImage = album.images.reduce((largest, image) => {
                if (image.height > largest.height) return image
                return largest
                }, album.images[0]);
                return {
                    id: album.id,
                    albumUrl: largestAlbumImage.url,
                    album: album.name,
                    artist: album.artists[0].name,
                    tracks: album.tracks.items,
                    artistId: album.artists[0].id
                }
            }).filter(item => item != null) 
        })  
    })
}

