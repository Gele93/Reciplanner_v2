import "../css/login.css"
import { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom';
import { RecipeContext } from "../ContextProvider"

function Login({ isLoginHighlight, loginError, setLoginError, setIsLoginHighlight }) {

    const [isLogedIn, setIsLogedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { user, setUser } = useContext(RecipeContext)

    const fetchLogin = async (loginData) => {
        try {
            const response = await fetch("https://localhost:7034/User/login", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    loginData,
                ),
            })
            if (!response.ok) {
                return null
            }
            const user = await response.json()
            return user
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoginHighlight(false)
        const loginData = { username, password }
        const curUser = await fetchLogin(loginData)

        if (!curUser) {
            setLoginError("invalid username or password")
            return
        } else {
            setIsLogedIn(true)
            localStorage.setItem("curUserId", curUser.id)
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