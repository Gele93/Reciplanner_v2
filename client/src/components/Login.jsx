import "../css/login.css"
import { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom';
import { RecipeContext } from "../ContextProvider"

function Login({ isLoginHighlight, loginError, setLoginError, setIsLoginHighlight }) {

    const [isLogedIn, setIsLogedIn] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { user, setUser } = useContext(RecipeContext)

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

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoginHighlight(false)
        const loginData = { username, password }
        const curUser = allUsers.find(u => u.username === username)

        if (!curUser) {
            setLoginError("invalid username or password")
            return
        } else if (curUser.password !== password) {
            setLoginError("invalid username or password")
            return
        } else {
            setIsLogedIn(true)
            localStorage.setItem("curUserId", curUser._id)
            setUser(curUser)
        }

    }



    return (
        <>
            {user ? (
                <>
                    <div className="login">
                        <p>Bon Apetit {user.username} !</p>
                    </div>
                </>
            ) : (
                <>
                    <div className={`login ${isLoginHighlight ? "login-highlight" : ""}`}>
                        <form onSubmit={(e) => handleLogin(e)} className="login-form">
                            <div className="form-row">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <input className="login-button" type="submit" value="Login" />
                            </div>
                            <p className="create-p">
                                Or
                                <Link to="/create-user"><span className="click-here">click here</span></Link>
                                to create a new account.
                            </p>
                        </form>
                        {loginError &&
                            <div className="error">
                                {loginError}
                            </div>
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default Login