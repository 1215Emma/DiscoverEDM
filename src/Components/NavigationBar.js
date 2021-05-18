import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
const NavigationBar = ({ navArtists, navEvents }) => {
    
    return (
        <nav className='navBar'>        
                <h1>{navArtists}</h1>
                <p><BiDotsVerticalRounded /></p>
                <h1>{navEvents}</h1>   
        </nav>
    )
}

NavigationBar.defaultProps = {
    navArtists: 'Artists',
    navEvents: 'Events'
}
export default NavigationBar 