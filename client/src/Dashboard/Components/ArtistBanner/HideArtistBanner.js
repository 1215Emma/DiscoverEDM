import React from 'react'
import AlbumBannerTracksJSX from '../AlbumBanner/AlbumBannerTracks'
import { useAlbumButtons } from '../../Helper/SearchingContext'
import { useHideArtistBanner } from '../../Helper/DashboardContext'

const HideArtistBanner = () => {
    const buttonArtists = useAlbumButtons()
    const hideArtistBanner = useHideArtistBanner()
    console.log(buttonArtists)
    return (
        <>
   { hideArtistBanner && 
        <div className="album-banner">            
                {buttonArtists.map(albumSongs => {
                    return (
                        <AlbumBannerTracksJSX albumSongs={albumSongs} />
                    )
                })}   
            </div> 
        }       

</>
    )}

export default HideArtistBanner
