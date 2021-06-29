// Setting up the authorization login link into Spotify

export const authEndpoint = "https://accounts.spotify.com/authorize"

const clientId = "c0024b0181434c5c848e7f5bf8a7afe0"
const redirectUri = "http://localhost:3000"
const scopes = [
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "ugc-image-upload",
]

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&show_dialog=true`
