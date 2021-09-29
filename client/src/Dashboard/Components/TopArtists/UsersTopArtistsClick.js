// import React from 'react'

// const UsersTopArtistsClick = ({artists}) => {
//     let search = ('')
//     const searchArtist = () => {
//         search = artists.name.toLowerCase()
//         const LSsearch = localStorage.getItem("artist-card-search").toLowerCase()
//         if (search === LSsearch) {
//             return (
//                 <div className="top-artists-container-clicked">
//                     <div className="artist-banner-card">
//                         <div className="top-artists-card-clicked">
//                             <img src={artists.image2.url} alt="" className="artist-image-clicked" />
//                             <div className="artist-name-clicked">{artists.name}</div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//         else {
//             return null
//         }
//     }
//     return (
//         searchArtist()
//     )
// }

// export default UsersTopArtistsClick