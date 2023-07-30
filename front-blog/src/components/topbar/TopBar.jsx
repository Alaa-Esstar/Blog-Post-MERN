import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = process.env.REACT_APP_IMG_URL; // Access the environment variable

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
    }
    return (
        <div className='top'>
            <div className="topLeft">
                <Link to={"https://www.facebook.com/Digostastar"} target="_blanck">
                    <i className="topIcon fa-brands fa-square-facebook"></i>
                </Link>
                <Link to={"https://github.com/Alaa-Esstar"} target="_blank">
                    <i className="topIcon fa-brands fa-square-github"></i>
                </Link>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to={"/"}>Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to={"/write"}>Write</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>{user && "Logout"}</li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <Link to="/settings">
                            <img className="topImg" src={PF + user.profilePicture} alt="" />
                        </Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to={"/login"}>Login</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to={"/register"}>Register</Link>
                            </li>
                        </ul >
                    )
                }
            </div>
        </div>
    )
}
