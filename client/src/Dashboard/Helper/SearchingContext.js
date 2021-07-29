import React, { useContext, useState } from 'react'
import albumBannerLogic from '../Components/AlbumBanner/albumBannerLogic'
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
        setAlbumButtons([albumBannerLogic(e)])
    }
    
    
    return (
        <AlbumButtonsContext.Provider value={albumButtons}>
            <AlbumCoverClickContext.Provider value={albumCoverClick}>
                {children}
            </AlbumCoverClickContext.Provider>
        </AlbumButtonsContext.Provider>
    )
}