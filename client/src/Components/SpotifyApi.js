
import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

export function SearchAlbum() {
    let cancel = false
    return spotifyApi.searchAlbums(search, { limit: 50 }).then(res => {
        if (cancel) return
        (res.body.albums.items.map(album => {
            const smallestAlbumImage = album.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
            }, album.images[0]);

            if (album.album_type === "album" && album.artists[0].name.toLowerCase().includes(search.toLowerCase()) && !album.name.includes("Remix")) {
                return {
                    albumUrl: smallestAlbumImage.url,
                    album: album.name,
                }
            }
            else {
                return null
            }
        }))
    })
}
