import React from 'react'
import ArtistInfo from './ArtistInfo'

const ArtistInfoObj = ({ events }) => {
    return (
        <>
        {events.map((event) => (
            <ArtistInfo key={event.id} event={event} />
        ))}
        </>
    )
}

export default ArtistInfoObj
