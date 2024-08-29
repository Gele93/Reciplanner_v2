import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../ContextProvider'
import { Link, useNavigate } from 'react-router-dom';

function Profile() {

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { user, setUser } = useContext(RecipeContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        setUser("")
        setIsProfileOpen(false)
        navigate("/")
        localStorage.setItem("curUserId", "")
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.id !== "profile-pic") {
                setIsProfileOpen(false)
            }
        }

        window.addEventListener("click", (e) => handleClick(e))

        return (
            window.removeEventListener("click", (e) => handleClick(e))
        )
    }, [])

    return (
        <>
            <div className='profile' >
                {user &&
                    <img onClick={() => setIsProfileOpen(!isProfileOpen)} className='profile-pic' src={user.profilePic ? `/static/${user.profilePic}` : '/anonimuser.png'} id="profile-pic" />
                }
            </div>
            {
                isProfileOpen &&
                <div className='profile-menu'>
                    <Link to={`/edit-profile/${user._id}`}><button onClick={() => setIsProfileOpen(false)} className='login-button menu-button' type="button">Profile</button></Link>
                    <Link to="/calendar"><button onClick={() => setIsProfileOpen(false)} className='login-button menu-button' type="button">My calendar</button></Link>
                    <button className='login-button menu-button' type="button">My recipes</button>
                    <button onClick={handleLogout} className='login-button menu-button' type="button">Logout</button>
                </div>
            }
        </>
    )
}

export default Profile