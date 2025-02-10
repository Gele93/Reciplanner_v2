import { useNavigate, Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { RecipeContext } from '../../ContextProvider'
import { fetchLogout } from '../../scripts'

function ProfileDropdown({ setIsProfileOpen }) {

    const { user, setUser } = useContext(RecipeContext)

    const navigate = useNavigate()



    const handleLogout = async () => {
        await fetchLogout()
        setUser("")
        setIsProfileOpen(false)
        navigate("/")
        localStorage.setItem("curUserId", 0)
    }

    return (
        <div className='profile-menu'>
            <Link to={`/edit-profile/${user.id}`}>
                <button
                    onClick={() => setIsProfileOpen(false)}
                    className='login-button menu-button'
                    type="button">
                    Profile
                </button>
            </Link>
            <Link to="/calendar">
                <button
                    onClick={() => setIsProfileOpen(false)}
                    className='login-button menu-button'
                    type="button">
                    My calendar
                </button>
            </Link>
            <Link to="/my-recipes">
                <button
                    onClick={() => setIsProfileOpen(false)}
                    className='login-button menu-button'
                    type="button">
                    My recipes
                </button>

            </Link>
            <button onClick={handleLogout} className='login-button menu-button' type="button">Logout</button>
        </div>
    )
}

export default ProfileDropdown