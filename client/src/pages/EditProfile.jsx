import "../css/editprofile.css"
import { Link, useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { RecipeContext } from "../ContextProvider"

function CreateUser() {

    const { user, setUser } = useContext(RecipeContext)

    const [username, setUsername] = useState(user?.username ?? "")
    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [password, setPassword] = useState(user?.password ?? "")
    const [confirmPassword, setConfirmPassword] = useState(user?.password ?? "")
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [email, setEmail] = useState(user?.email ?? "")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [gender, setGender] = useState(user?.gender ?? "")
    const [age, setAge] = useState(user?.age ?? 0)
    const [isAgeValid, setIsAgeValid] = useState(true)
    const [weight, setWeight] = useState(user?.weight ?? 0)
    const [isWeightValid, setIsWeightValid] = useState(true)
    const [height, setHeight] = useState(user?.height ?? 0)
    const [isHeightValid, setIsHeightValid] = useState(true)
    const [profilePic, setProfilePic] = useState(user?.profilePic ?? "")

    const [allUsers, setAllUsers] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [isCreated, setIsCreated] = useState(false)

    const params = useParams()

    useEffect(() => {
        setUsername(user.username)
        setPassword(user.password)
        setConfirmPassword(user.password)
        setEmail(user.email)
        setGender(user.gender)
        setAge(user.age)
        setWeight(user.weight)
        setHeight(user.height)
        setProfilePic(user.profilePic)
    }, [user])


    const fetchPatchUser = async (updatedUser) => {
        try {
            const response = await fetch(`/api/users/${params.userid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            })
            if (!response.ok) {
                throw new Error(`updating user went wrong`)
            }
            const addedUser = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users")
            if (!response.ok) {
                throw new Error("fetching users went wrong")
            }
            const users = await response.json()
            setAllUsers(users)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchUsers()
    }, [])


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

    const handleUpdateUser = (e) => {
        e.preventDefault()
        const userToUpdate = { username, password, email, gender, age, weight, height, profilePic, _id: params.userid }
        console.log(userToUpdate)
        if (allUsers.find(u => u.username === username) && username !== user.username) {
            setIsUsernameValid(false)
            setErrorMsg(`There is already a ${username} user`)
            return
        }
        if (password !== confirmPassword) {
            setIsPasswordValid(false)
            setErrorMsg("Password confirmation failed ")
            return
        }

        let validity = checkValidity()


        console.log(userToUpdate)
        if (validity) {
            setIsUsernameValid(true)
            setIsPasswordValid(true)
            setIsEmailValid(true)
            setIsAgeValid(true)
            setIsWeightValid(true)
            setIsHeightValid(true)
            setErrorMsg("")
            setIsCreated(true)
            setUser(userToUpdate)
            fetchPatchUser(userToUpdate)

        }
    }

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("profilePic", file)

        try {
            const response = await fetch("/api/upload", {
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
                <form onSubmit={(e) => handleUpdateUser(e)} className="login-form">
                    <div className="create-form-row">
                        <label htmlFor="username">*Username:</label>
                        <input defaultValue={user.username} className={isUsernameValid ? "" : "invalid"} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="password">*Password:</label>
                        <input defaultValue={user.password} className={isPasswordValid ? "" : "invalid"} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="confirm-password">*Confirm password:</label>
                        <input defaultValue={user.password} className={isPasswordValid ? "" : "invalid"} type="password" id="confirm-password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="email">*Email:</label>
                        <input defaultValue={user.email} className={isEmailValid ? "" : "invalid"} type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <div className='radio-title'>*Gender:</div>
                        <div className='radio'>
                            <label htmlFor="male">Male</label>
                            <input checked={user.gender === "male"} type="radio" id="male" name="gender" onChange={(e) => setGender(e.target.id)} />
                            <label htmlFor="female">Female</label>
                            <input checked={user.gender === "female"} type="radio" id="female" name="gender" onChange={(e) => setGender(e.target.id)} />
                        </div>
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="age">*Age:</label>
                        <input defaultValue={user.age} className={isAgeValid ? "" : "invalid"} type="number" id="age" name="age" onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="weight">*Weight:</label>
                        <input defaultValue={user.weight} className={isWeightValid ? "" : "invalid"} type="number" id="weight" name="weight" onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="height">*Height:</label>
                        <input defaultValue={user.height} className={isHeightValid ? "" : "invalid"} type="number" id="height" name="height" onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div className="create-form-row">
                        <label htmlFor="profile-pic">Profile picture:</label>
                        <input type="file" id="profile-pic" name="profile-pic" accept="image/png, image/jpeg" onChange={(e) => handleProfilePicUpload(e)} />
                    </div>
                    <div className="register-row">
                        <input className="login-button create-button" type="submit" value="Update" />
                        <Link className="link" to="/"><button type="button" className="login-button create-button">Back</button></Link>
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
                            {username} is updated!
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