import React, {useContext} from 'react'
import '../css/navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../ContextProvider';

function Navbar({ setIsLoginHighlight, setLoginError }) {

  const { user, setUser } = useContext(RecipeContext)
  const navigate = useNavigate()

  const handleCalendarClick = () => {
    if (user) {
      navigate("/calendar")
    } else {
      setIsLoginHighlight(true)
      setLoginError("You need to log in to use the calendar.")
    }
  }

  return (
    <div className='navbar'>
      <Link className='navbar-link' to="/recipes" >Recipes</Link>
      <button onClick={handleCalendarClick} className='navbar-link' to="/calendar" >Calendar</button>
    </div>
  )
}

export default Navbar