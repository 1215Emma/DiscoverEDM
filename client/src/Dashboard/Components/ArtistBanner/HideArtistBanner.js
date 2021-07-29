import React from 'react'
import AlbumBannerTracks from '../AlbumBanner/AlbumBannerTracks'
import { useAlbumButtons } from '../../Helper/SearchingContext'
import { useHideArtistBanner } from '../../Helper/DashboardContext'

const HideArtistBanner = () => {
    const buttonArtists = useAlbumButtons()
    const hideArtistBanner = useHideArtistBanner()
    return (
        <>
   { hideArtistBanner && 
        <div className="album-banner">            
                {buttonArtists.map(albumSongs => {
                    return (
                        <AlbumBannerTracks albumSongs={albumSongs} />
                    )
                })}   
            </div> 
        }       

</>
    )}

export default HideArtistBanner
