import React from 'react'
import { useHideArtistBanner, useArtistBanner, useArtistBannerTracks } from '../Helper/SearchBarContext'
import { ArtistBanner, ArtistBannerTracks } from './ArtistBanner'


function DisplayArtistBanner() {
    const hideArtistBanner = useHideArtistBanner()
    const mainArtistBanner = useArtistBanner()
    const mainArtistBannerTracks = useArtistBannerTracks()
    return (
        <>
        {hideArtistBanner ?<></> : 
        <div className="artist-banner">
            {mainArtistBanner.map(results => {
            return <ArtistBanner key={results.id} results={results} />
            })}
            <div className="artist-banner-tracks">
                {mainArtistBannerTracks.map(bannerTracks => {
                return <ArtistBannerTracks key={bannerTracks.id} bannerTracks={bannerTracks} />
                })}
            </div>
        </div>}
        </>
    )
}

export default DisplayArtistBanner
