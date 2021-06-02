import React from 'react'

export default function TrackSearchResult({ track }) {
    return (
        <div className='ArtistCards'>
            <img src={track.albumUrl} className='AlbumCovers'/>
            <div className='SongName'>{track.title}</div>
            <div className='ArtistName'>{track.artist}</div>
            <div className='AlbumName'>{track.album}</div>
        </div>
    )
}
