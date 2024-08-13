import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <Link className='navbar-link' to="/recipes" >Recipes</Link>
      <Link className='navbar-link' to="/calendar" >Calendar</Link>
    </div>
  )
}

export default Navbar