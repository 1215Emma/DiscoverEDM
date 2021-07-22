import SearchResults from './SearchResults'
import { useResults, useSetHideArtistBanner } from '../Helper/SearchBarContext'
import { useAlbumButtons, useAlbumCoverClick } from '../Helper/SearchingContext'

const Searching = () => {
const allResults = useResults()
const albumButtons = useAlbumButtons()
const albumCoverClick = useAlbumCoverClick()
const setHideArtistBanner = useSetHideArtistBanner()
return (
    <div className="SearchResults">
        <div className="mappedresults">
            
            {allResults.map(track => {
                return (
                <button onClick={e => {
                albumCoverClick([track]); setHideArtistBanner(true) }} className="album-covers">
                <SearchResults key={track.id} track={track} /> 
                </button>
                )
            })}
        
        </div>
    </div>
)
}
export default Searching