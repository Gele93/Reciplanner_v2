import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../ContextProvider'
import { Link, useNavigate } from 'react-router-dom';

function Profile() {

    const [isProfileOpen, setIsProfileOpen] = useState(false)
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

    //<img onClick={() => setIsProfileOpen(!isProfileOpen)} className='profile-pic' src="https://a0.anyrgb.com/pngimg/1002/238/anonim-user-profile-account-avatar-icon-design-user-hat-female-woman-silhouette.png" id="profile-pic" />

    return (
        <>
            <div className='profile' >
                {user &&
                    <img onClick={() => setIsProfileOpen(!isProfileOpen)} className='profile-pic' src={user.profilePic ? `https://localhost:7034/${user.profilePic}` : '/anonimuser.png'} id="profile-pic" />
                }
            </div>
            {
                isProfileOpen &&
                <div className='profile-menu'>
                    <Link to={`/edit-profile/${user.id}`}><button onClick={() => setIsProfileOpen(false)} className='login-button menu-button' type="button">Profile</button></Link>
                    <Link to="/calendar"><button onClick={() => setIsProfileOpen(false)} className='login-button menu-button' type="button">My calendar</button></Link>
                    <button className='login-button menu-button' type="button">My recipes</button>
                    <button onClick={handleLogout} className='login-button menu-button' type="button">Logout</button>
                </div>
            }
        </>
    )
}

export default Profile