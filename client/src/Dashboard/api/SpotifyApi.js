import SpotifyWebApi from 'spotify-web-api-node'
import _ from 'underscore'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

// grabs api and pulls album artworks only //
// export const getAlbums = () => {
//     spotifyApi.setAccessToken(localStorage.getItem("access_token"))
//     return spotifyApi.searchAlbums('illenium', { limit: 50 }).then(res => {

//         return res.body.albums.items.map(album => {
//             const largestAlbumImage = album.images.reduce((largest, image) => {
//                 if (image.height > largest.height) return image
//                 return largest
//             }, album.images[0]);

//             if (album.album_type === "album" && !album.name.includes("Remix")) {
//                 return {
//                     id: album.id,
//                     albumUrl: largestAlbumImage.url,
//                     album: album.name,
//                 }
//             }
//             else {
//                 return null
//             }
//         }).filter(item => item != null)
//     })

// }
export async function fetchBoth() {
        spotifyApi.setAccessToken(localStorage.getItem("access_token"))
        const fetchAlbums = spotifyApi.searchAlbums('illenium', { limit: 50 });
        async function fetchTracks() {
            let cancel = true
            let hasNext = true
            let Offset = 0;
            let limit = 5;
            const songArr = [];
            while (hasNext && limit > 0) {
                limit--
                await spotifyApi.searchTracks('illenium', { limit: 50, offset: Offset }).then( res =>{
                    if (cancel === true) {
                        songArr.push(res.body.tracks.items)
                        Offset += 50
                    }
                    if (res.body.tracks.total <= Offset) {
                        hasNext = false
                        cancel = false
                    }
                })
            }
            return songArr
        }

        const res = await Promise.all([fetchAlbums, fetchTracks()])
        
            res[0] = res[0].body.albums.items.map(album => {
                const largestAlbumImage = album.images.reduce((largest, image) => {
                if (image.height > largest.height) return image
                return largest
                }, album.images[0]);

                if (album.album_type === "album" && !album.name.includes("Remix")) {
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

            
            res[1] = [].concat.apply([], res[1])
            res[1] = res[1].map(track => {
                    return {
                        albumUrl: track.albumUrl,
                        artist: track.artists[0].name,
                        title: track.name,
                        id: track.id,
                        albumType: track.album.album_type,
                        album: track.album.name,
                    }
                }).filter(item => item != null)
        
            const newCombine = res[0].map(combine => (
            res[1].filter(c => c.album === combine.album)))
            let finalCombine = [].concat.apply([], newCombine)
            finalCombine = [...res[0], ...finalCombine]
            finalCombine = _.groupBy(finalCombine, "album")
            finalCombine = Object.values(finalCombine)
            finalCombine = [].concat.apply([], finalCombine)
            return Promise.resolve(finalCombine)     
}
// // grabs the array [mergedSongArr] that we pushed all the data from the api pull into and maps through it and returns the info we want 
// export const SearchTrack = (mergedSongArr) => {
//     return mergedSongArr.map(track => {

//         return {
//             albumUrl: track.albumUrl,
//             artist: track.artists[0].name,
//             title: track.name,
//             id: track.id,
//             albumType: track.album.album_type,
//             album: track.album.name,
//         }
//     }).filter(item => item != null)
// }


//     const fetchAlbums = () => {
//         spotifyApi.setAccessToken(localStorage.getItem("access_token"))
//         return spotifyApi.searchAlbums('illenium', { limit: 50 }).then(res => {

//         return res.body.albums.items.map(album => {
//             const largestAlbumImage = album.images.reduce((largest, image) => {
//                 if (image.height > largest.height) return image
//                 return largest
//             }, album.images[0]);

//             if (album.album_type === "album" && !album.name.includes("Remix")) {
//                 return {
//                     id: album.id,
//                     albumUrl: largestAlbumImage.url,
//                     album: album.name,
//                 }
//             }
//             else {
//                 return null
//             }
//         }).filter(item => item != null)
//         })
//     }
    
//     const fetchTracks = () => {
//         let cancel = true
//         let hasNext = true
//         let Offset = 0;
//         let limit = 5;
//         const songArr = [];
//         while (hasNext && limit > 0) {
//             limit--
//             spotifyApi.setAccessToken(localStorage.getItem("access_token"))
//             const res = spotifyApi.searchTracks('illenium', { limit: 50, offset: Offset })
//             if (cancel === true) {
//                 songArr.push(res.body.tracks.items)
//                 Offset += 50
//             }
//             if (res.body.tracks.total <= Offset) {
//                 hasNext = false
//                 cancel = false
//             }
//         }
//         const mergedSongArr = [].concat.apply([], songArr)
//             mergedSongArr.map(track => {
//                 return {
//                     albumUrl: track.albumUrl,
//                     artist: track.artists[0].name,
//                     title: track.name,
//                     id: track.id,
//                     albumType: track.album.album_type,
//                     album: track.album.name,
//                 }
//             }).filter(item => item != null)
//     }
  
// Promise.all([fetchAlbums(), fetchTracks()]).then((values) => {
//     console.log(values)
// })

//     const fetchAlbums = new fetchAlbums((resolve, reject) => {
//         setTimeout(() => {
//             spotifyApi.setAccessToken(localStorage.getItem("access_token"))
//             const newValue = spotifyApi.searchAlbums('illenium', { limit: 50 }).then(res => {

//             return res.body.albums.items.map(album => {
//                 const largestAlbumImage = album.images.reduce((largest, image) => {
//                     if (image.height > largest.height) return image
//                     return largest
//                 }, album.images[0]);

//                 if (album.album_type === "album" && !album.name.includes("Remix")) {
//                     return {
//                         id: album.id,
//                         albumUrl: largestAlbumImage.url,
//                         album: album.name,
//                     }
//                 }
//                 else {
//                     return null
//                 }
//             }).filter(item => item != null)
//             })
//             resolve(newValue)
//         }, 5000);   
//     })
    
//     const fetchTracks = new fetchTracks((resolve, reject) => {
//         setTimeout(() => {
//             let cancel = true
//             let hasNext = true
//             let Offset = 0;
//             let limit = 5;
//             const songArr = [];
//             while (hasNext && limit > 0) {
//                 limit--
//                 spotifyApi.setAccessToken(localStorage.getItem("access_token"))
//                 return spotifyApi.searchTracks('illenium', { limit: 50, offset: Offset }).then( res => {
//                 if (cancel === true) {
//                     songArr.push(res.body.tracks.items)
//                     Offset += 50
//                 }
//                 if (res.body.tracks.total <= Offset) {
//                     hasNext = false
//                     cancel = false
//                 }
//             })
//             }
//             const mergedSongArr = [].concat.apply([], songArr)
//                 const newValue = mergedSongArr.map(track => {
//                     return {
//                         albumUrl: track.albumUrl,
//                         artist: track.artists[0].name,
//                         title: track.name,
//                         id: track.id,
//                         albumType: track.album.album_type,
//                         album: track.album.name,
//                     }
//                 }).filter(item => item != null)
//             resolve(newValue)
//         }, 8000)
//     })
  
// export async function fetchAsyncData() {
//     const res = await Promise.all([fetchAlbums, fetchTracks]);
//     console.log(res)
// }
