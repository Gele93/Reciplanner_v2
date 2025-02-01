import "../css/create.css"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { RecipeContext } from "../ContextProvider"

function CreateUser() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [profilePic, setProfilePic] = useState("")

    const [userNameValidity, setUserNameValidity] = useState("")
    const [passwordValidy, setPasswordValidity] = useState("")
    const [confirmPasswordValidy, setConfirmPasswordValidity] = useState("")
    const [emailValidity, setEmailValidity] = useState("")
    const [ageValidity, setAgeValidity] = useState("")
    const [weightValidity, setWeightValidity] = useState("")
    const [HeightValidity, setHeightValidity] = useState("")

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

    const handleCreateUser = async (e) => {
        e.preventDefault()
        const userToAdd = { username, password, email, gender, age, weight, height, profilePic }

        console.log(userToAdd)

        if (checkValidity()) {
            if (await fetchPostUser(userToAdd)) {
                setErrorMsg("")
                setIsCreated(true)
           //     setUser(userToAdd)
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

    const checkValidity = () => {
        let validity = true

        if (!checkUsernameValidity(username)) validity = false
        if (!checkPasswordValidity(password)) validity = false
        if (!checkConfirmPasswordValidity(confirmPassword)) validity = false
        if (!checkEmailValidity(email)) validity = false
        if (!checkAgeValidity(age)) validity = false
        if (!checkWeightValidity(weight)) validity = false
        if (!checkHeightValidity(height)) validity = false

        if (!validity) setErrorMsg("One or more fields are invalid!")

        return validity
    }

    const checkUsernameValidity = (curUsername) => {
        if (curUsername.length < 5) {
            setErrorMsg("Username must be at least 5 characters!")
            setUserNameValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setUserNameValidity("valid")
            return true
        }
    }
    const handleUsernameChange = (e) => {
        checkUsernameValidity(e.target.value)
        setUsername(e.target.value)
    }

    const checkPasswordValidity = (curPassword) => {
        if (curPassword.length < 6) {
            setErrorMsg("Password must be at least 6 characters!")
            setPasswordValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setPasswordValidity("valid")
            return true
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        checkPasswordValidity(e.target.value)
    }

    const checkConfirmPasswordValidity = (curConfPassword) => {
        if (curConfPassword !== password) {
            setErrorMsg("Passwords are not matching")
            setConfirmPasswordValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setConfirmPasswordValidity("valid")
            return true
        }
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        checkConfirmPasswordValidity(e.target.value)
    }

    const checkEmailValidity = (curEmail) => {
        if (!curEmail.includes("@") || !curEmail.includes(".")) {
            setErrorMsg("Invalid Email format")
            setEmailValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setEmailValidity("valid")
            return true
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        checkEmailValidity(e.target.value)
    }

    const checkAgeValidity = (curAge) => {
        if (curAge < 1) {
            setErrorMsg("Please isert valid age")
            setAgeValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setAgeValidity("valid")
            return true
        }
    }
    const handleAgeChange = (e) => {
        setAge(e.target.value)
        checkAgeValidity(e.target.value)
    }

    const checkWeightValidity = (curWeight) => {
        if (curWeight < 1) {
            setErrorMsg("Please isert valid age")
            setWeightValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setWeightValidity("valid")
            return true
        }
    }
    const handleWeightChange = (e) => {
        setWeight(e.target.value)
        checkWeightValidity(e.target.value)
    }

    const checkHeightValidity = (curHeight) => {
        if (curHeight < 1) {
            setErrorMsg("Please isert valid age")
            setHeightValidity("invalid")
            return false
        } else {
            setErrorMsg("")
            setHeightValidity("valid")
            return true
        }
    }
    const handleHeightChange = (e) => {
        setHeight(e.target.value)
        checkHeightValidity(e.target.value)
    }

    return (
        <>
            <div className="create">
                <form noValidate onSubmit={(e) => handleCreateUser(e)} className="login-form">
                    <div className="create-form-row">
                        <label htmlFor="username">*Username:</label>
                        <input
                            className={userNameValidity}
                            type="text" id="username" name="username"
                            onChange={(e) => handleUsernameChange(e)}
                            onFocus={(e) => checkUsernameValidity(e.target.value)}
                            onBlur={() => setUserNameValidity("")}
                        />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="password">*Password:</label>
                        <input
                            className={passwordValidy}
                            type="password" id="password" name="password"
                            onChange={(e) => handlePasswordChange(e)}
                            onFocus={(e) => checkPasswordValidity(e.target.value)}
                            onBlur={() => setPasswordValidity("")}
                        />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="confirm-password">*Confirm password:</label>
                        <input className={confirmPasswordValidy}
                            type="password" id="confirm-password" name="confirm-password"
                            onChange={(e) => handleConfirmPasswordChange(e)}
                            onFocus={(e) => checkConfirmPasswordValidity(e.target.value)}
                            onBlur={() => setConfirmPasswordValidity("")}
                        />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="email">*Email:</label>
                        <input className={emailValidity}
                            type="email" id="email" name="email"
                            onChange={(e) => handleEmailChange(e)}
                            onFocus={(e) => checkEmailValidity(e.target.value)}
                            onBlur={() => setEmailValidity("")}
                        />
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
                        <input className={ageValidity}
                            type="number" id="age" name="age"
                            onChange={(e) => handleAgeChange(e)}
                            onFocus={(e) => checkAgeValidity(e.target.value)}
                            onBlur={() => setAgeValidity("")}
                        />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="weight">*Weight:</label>
                        <input className={weightValidity}
                            type="number" id="weight" name="weight"
                            onChange={(e) => handleWeightChange(e)}
                            onFocus={(e) => checkWeightValidity(e.target.value)}
                            onBlur={() => setWeightValidity("")}
                        />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="height">*Height:</label>
                        <input className={HeightValidity}
                            type="number" id="height" name="height"
                            onChange={(e) => handleHeightChange(e)}
                            onFocus={(e) => checkHeightValidity(e.target.value)}
                            onBlur={() => setHeightValidity("")} />
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