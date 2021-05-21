import React, { useState } from 'react'

const AddArtistForm = ({ onQueue }) => {
    const [artist, setArtist] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!artist) {
            alert('Please add artist')
            return
        }
        onQueue({ artist, date, location })

        setArtist('')
        setDate('')
        setLocation('')
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='inner-form'>
                <label>Artist name</label>
                <input type="text" placeholder='select artist' 
                value={artist} onChange={(e) => setArtist(e.target.value)}/>
            </div>
            <div className='inner-form'>
                <label>Date</label>
                <input type="text" placeholder='MM/DD/YYYY'
                value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className='inner-form'>
                <label>Location</label>
                <input type="text" placeholder='City, State'
                value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <input className='queue-event' type='submit' value='queue event' />
        </form>
    )
}

export default AddArtistForm
