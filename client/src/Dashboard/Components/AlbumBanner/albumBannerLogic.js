import React from 'react'

function albumBannerLogic(e) {
    const albumBanner = e[0]
    
    return {
        albumName: albumBanner.album,
        albumUrl: albumBanner.albumUrl,
        artistNamae: albumBanner.artist,
        artistId: albumBanner.artistId,
        albumId: albumBanner.id,
        tracks: albumBanner.tracks.map(results => {
            return {
                trackNumber: results.track_number,
                songLength: results.duration_ms,
                songName: results.name, 
                trackId: results.id,
                artistNames: results.artists.map(artists => {
                    return {
                        artists: artists.name,
                        artistsId: artists.id,
                    }
                })
            }
        })
    }
}
export default albumBannerLogic
