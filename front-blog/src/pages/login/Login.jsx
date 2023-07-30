import { Link } from "react-router-dom"
import "./login.css"
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context)
    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${apiBaseUrl}auth/login`, {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("wrong credentials!");
            } else {
                setError("Something went wrong");
            }
            dispatch({ type: "LOGIN_FAILURE" });

        }
    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="loginInput" placeholder="Enter your username"
                    ref={userRef} />
                <label>Password</label>
                <input type="password" className="loginInput" placeholder="Enter your password"
                    ref={passwordRef} />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
                <Link className="link" to={"/register"}>
                    <button className="loginRegisterButton" type="button">Register</button>
                </Link>
                {error &&
                    <span className="errorMessage">{error}</span>
                }
            </form>
        </div>
    )
}
