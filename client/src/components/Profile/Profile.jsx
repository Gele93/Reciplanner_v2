import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../../ContextProvider';
import ProfileDropdown from './ProfileDropdown';

function Profile() {

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { user, setUser } = useContext(RecipeContext)

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
                    <img onClick={() => setIsProfileOpen(!isProfileOpen)} className='profile-pic' src={user.profilePic ? `https://localhost:7034/${user.profilePic}` : '/anonimuser.png'} id="profile-pic" />
                }
            </div>
            {
                isProfileOpen &&
                <ProfileDropdown setIsProfileOpen={setIsProfileOpen} />
            }
        </>
    )
}

export default Profile


//<img onClick={() => setIsProfileOpen(!isProfileOpen)} className='profile-pic' src="https://a0.anyrgb.com/pngimg/1002/238/anonim-user-profile-account-avatar-icon-design-user-hat-female-woman-silhouette.png" id="profile-pic" />
