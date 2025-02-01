import "../../css/login.css"
import { useContext } from "react"
import { RecipeContext } from "../../ContextProvider"
import LoginForm from "./LoginForm";

function Login({ isLoginHighlight, loginError, setLoginError, setIsLoginHighlight }) {

    const { user, setUser } = useContext(RecipeContext)

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
                        <LoginForm setIsLoginHighlight={setIsLoginHighlight} setLoginError={setLoginError} setUser={setUser}/>
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