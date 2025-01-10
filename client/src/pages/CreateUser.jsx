import "../css/create.css"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { RecipeContext } from "../ContextProvider"

function CreateUser() {

    const [username, setUsername] = useState("")
    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [gender, setGender] = useState("")
    const [isGenderValid, setIsGenderValid] = useState(true)
    const [age, setAge] = useState(0)
    const [isAgeValid, setIsAgeValid] = useState(true)
    const [weight, setWeight] = useState(0)
    const [isWeightValid, setIsWeightValid] = useState(true)
    const [height, setHeight] = useState(0)
    const [isHeightValid, setIsHeightValid] = useState(true)
    const [profilePic, setProfilePic] = useState("")

    const [allUsers, setAllUsers] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [isCreated, setIsCreated] = useState(false)

    const { user, setUser } = useContext(RecipeContext)


    const fetchPostUser = async (newUser) => {
        try {
            const response = await fetch("https://localhost:7034/User/register", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    newUser,
                ),
            })
            if (!response.ok) {
                const errorData = await response.json()
                if (response.status === 409) {
                    setErrorMsg(errorData.error)
                }
                return false
            }
            return true
        } catch (error) {
            console.error(error)
        }
    }

    const checkValidity = () => {
        let validity = true
        if (!username) {
            setIsUsernameValid(false)
            validity = false
        }
        if (!password) {
            setIsPasswordValid(false)
            validity = false
        }
        if (!email) {
            setIsEmailValid(false)
            validity = false
        }
        if (!gender) {
            setIsGenderValid(false)
            validity = false
        }
        if (!age) {
            setIsAgeValid(false)
            validity = false
        }
        if (!weight) {
            setIsWeightValid(false)
            validity = false
        }
        if (!height) {
            setIsHeightValid(false)
            validity = false
        }
        return validity
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()
        const userToAdd = { username, password, email, gender, age, weight, height, profilePic }

        if (password !== confirmPassword) {
            setIsPasswordValid(false)
            setErrorMsg("Password confirmation failed ")
            return
        }

        if (checkValidity()) {
            if (await fetchPostUser(userToAdd)) {
                setIsUsernameValid(true)
                setIsPasswordValid(true)
                setIsEmailValid(true)
                setIsAgeValid(true)
                setIsWeightValid(true)
                setIsHeightValid(true)
                setErrorMsg("")
                setIsCreated(true)
                setUser(userToAdd)
            }
        }
    }

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("profilePic", file)

        try {
            const response = await fetch("https://localhost:7034/User/profilepic", {
                method: "POST",
                body: formData
            })
            const filePath = await response.text()
            setProfilePic(filePath)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <div className="create">
                <form onSubmit={(e) => handleCreateUser(e)} className="login-form">
                    <div className="create-form-row">
                        <label htmlFor="username">*Username:</label>
                        <input className={isUsernameValid ? "" : "invalid"} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="password">*Password:</label>
                        <input className={isPasswordValid ? "" : "invalid"} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="confirm-password">*Confirm password:</label>
                        <input className={isPasswordValid ? "" : "invalid"} type="password" id="confirm-password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="email">*Email:</label>
                        <input className={isEmailValid ? "" : "invalid"} type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <div className='radio-title'>*Gender:</div>
                        <div className='radio'>
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="male" name="gender" onChange={(e) => setGender(e.target.id)} />
                            <label htmlFor="female">Female</label>
                            <input type="radio" id="female" name="gender" onChange={(e) => setGender(e.target.id)} />
                        </div>
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="age">*Age:</label>
                        <input className={isAgeValid ? "" : "invalid"} type="number" id="age" name="age" onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="weight">*Weight:</label>
                        <input className={isWeightValid ? "" : "invalid"} type="number" id="weight" name="weight" onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="height">*Height:</label>
                        <input className={isHeightValid ? "" : "invalid"} type="number" id="height" name="height" onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="profile-pic">Profile picture:</label>
                        <input type="file" id="profile-pic" name="profile-pic" accept="image/png, image/jpeg" onChange={(e) => handleProfilePicUpload(e)} />
                    </div>
                    <div className="register-row">
                        <input className="login-button create-button" type="submit" value="Register" />
                    </div>
                    <div className="create-p">
                        Or
                        <Link to="/"><span className="click-here">click here</span></Link>
                        to login.
                    </div>
                </form>
                {errorMsg &&
                    <div className="error">
                        {errorMsg}
                    </div>
                }
            </div>
            {
                isCreated &&
                <div className="created-bg">
                    <div className="created">
                        <p className="created-p">
                            {username} is created!
                        </p>
                        <div className="created-buttons">
                            <button onClick={() => setIsCreated(false)} className="created-button" type="button">OK</button>
                            <Link to="/">
                                <button className="created-button" type="button">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CreateUser