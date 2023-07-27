import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
    const {user, dispatch} = useContext(Context);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
    }
    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fa-brands fa-square-facebook"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
                <i className="topIcon fa-brands fa-square-github"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to={"/"}>Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to={"/"}>About</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to={"/"}>Contact</Link>
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
                        <img className="topImg" src={user.profilePicture} alt="" />
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
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
