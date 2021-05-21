import React from 'react'

const ArtistInfo = ({ event }) => {
    return (
        <div className="artistInfo">
            <div>
                <p>{event.artist}</p>
            </div>
            <div>
                <p>{event.date}</p>
            </div>
            <div>
                <p>{event.location}</p>
            </div>
        </div>
    )
}

export default ArtistInfo
