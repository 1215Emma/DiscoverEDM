import React from 'react'

export function SearchAlbums({ album }) {
    return (
        <div className='ArtistCards'>
            <img src={album.albumUrl} className='AlbumCovers' alt='album Artwork' />

        </div>
    )
}

export function SearchTracks({ track }) {
    return (
        <div className='ArtistCards'>
            <div className="AlbumImage">
                <img src={track.albumUrl} alt="album cover" />
            </div>
            <div className='SongName'>{track.title}</div>
            <div className='ArtistName'>{track.artist}</div>
        </div>
    )
}


