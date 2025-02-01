import { useNavigate, Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { RecipeContext } from '../../ContextProvider'

function ProfileDropdown({ setIsProfileOpen }) {

    const { user, setUser } = useContext(RecipeContext)

    const navigate = useNavigate()

    const fetchLogout = async () => {
        try {
            const response = await fetch("https://localhost:7034/User/logout", {
                method: 'POST',
                credentials: "include",
            })
            if (!response.ok) {
                throw new Error("Logout went wrong")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = async () => {
        await fetchLogout()
        setUser("")
        setIsProfileOpen(false)
        navigate("/")
        localStorage.setItem("curUserId", "")
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