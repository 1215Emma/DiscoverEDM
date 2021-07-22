import React, { useContext, useState } from 'react'
import albumBannerTracks from '../Components/albumBannerTracks'
const AlbumButtonsContext = React.createContext()
const AlbumCoverClickContext = React.createContext()

export const useAlbumButtons = () => {
    return useContext(AlbumButtonsContext)
}

export const useAlbumCoverClick = () => {
    return useContext(AlbumCoverClickContext)
}

export const AlbumButtonsProvider = ({ children }) => {
    const [albumButtons, setAlbumButtons] = useState([]);

    const albumCoverClick = (e) => {
        setAlbumButtons([albumBannerTracks(e)])
    }
    
    
    return (
        <AlbumButtonsContext.Provider value={albumButtons}>
            <AlbumCoverClickContext.Provider value={albumCoverClick}>
                {children}
            </AlbumCoverClickContext.Provider>
        </AlbumButtonsContext.Provider>
    )
}