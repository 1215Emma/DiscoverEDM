import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi({
    clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
})

export const userInfo = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"))
    const accessToken = credentials.accessToken
    spotifyApi.setAccessToken(accessToken)
    const getInfo = () => {
        const userInfo = spotifyApi.getMe()
        return userInfo.then(results => {
            const splitName = results.body.display_name.split(" ")
            return {
                firstName: splitName[0],
                lastName: splitName[1],
                name: results.body.display_name,
                email: results.body.email,
                profilePicture: results.body.images[0].url
            }
        })
    }  
   return (
       getInfo()
   )
}

export const topArtists = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"))
    const accessToken = credentials.accessToken
    spotifyApi.setAccessToken(accessToken)

    const topArtistsSearch = () => { 
        const getTopArtists = spotifyApi.getMyTopArtists()
        return getTopArtists.then(results => {
            return {
            topArtists: results.body.items
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    const newTop = topArtistsSearch().then(results => {
        return results.topArtists.map(results => {
            return {
            name: results.name,
            id: results.id,
            genres: results.genres,
            href: results.href,  
            image: results.images[2],
            image2: results.images[1]
            }
        })
    })
    
    return newTop
}
