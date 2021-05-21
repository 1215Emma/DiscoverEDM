import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

function Hamburger({ onAdd }) {
    return (
        <div className='hamburgerButton'>
           <GiHamburgerMenu onClick={onAdd} /> 
        </div>
    )
}

export default Hamburger
