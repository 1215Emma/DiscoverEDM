import { useAlbumButtons } from '../../Helper/SearchingContext'
import { UpperBannerAlbums } from '../UpperBanner/UpperBanner'
// Shows songs of albums only if hideArtistBanner is true which is changed to true on an onClick of an album cover
export const HideArtistBanner = () => {

    return (
        <>
   { artistIdentifier && 
        <div className="album-banner">            
                {buttonArtists.map(albumSongs => {
                    return (
                        <UpperBannerAlbums albumSongs={albumSongs} />
                    )
                })}   
            </div> 
        }       

</>
    )}