import React from 'react'
import ArtistCards from './ArtistCards'

const ArtistInfo = () => {
    
    const artists = [
    {
    artistName: 'Illenium',
    artistAlbum: 'Ascend',
    artistAlbumDate: 'August 16th, 2019',
    songs: {
        1: 'I Care',
        2: 'Good Things Fall Apart',
        3: 'Take You Down',
        4: 'Crashing',
        5: 'Every Piece Of Me',
        6: 'Sad Songs',
        7: 'In Your Arms',
        8: 'Angel',
        9: 'Hold On',
        10: 'Blood',
        11: 'All Together',
        12: 'Broken Ones',
        13: 'Takeaway',
        14: 'Pray',
        15: 'Gorgeous',
        16: 'Lonely'
    }}]

    const artistsInfo = artists.map(AIL => <ArtistCards AIL={AIL} />)
    return <div>{artistsInfo}</div>
    
}

export default ArtistInfo
