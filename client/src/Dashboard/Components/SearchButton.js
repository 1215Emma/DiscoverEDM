import React from 'react'

const SearchButton = ({ setSearch }) => {
    return (
        <div>
            <button
                type="submit" 
                className="SearchButton"  
                onClick={e => setSearch(e.target.value)} />
        </div>
    )
}

export default SearchButton
