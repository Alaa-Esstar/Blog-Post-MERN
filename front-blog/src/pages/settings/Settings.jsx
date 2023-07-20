import "./settings.css"
import SideBar from "../../components/sidebar/SideBar"

export default function Settings() {
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle">Delete account</span>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" />
                        <label htmlFor="fileInput">
                            <i className="seetingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="Alaa" />
                    <label>Email</label>
                    <input type="email" placeholder="alaa.esstar@gamil.com" />
                    <label>Password</label>
                    <input type="password" placeholder="..."/>
                    <button className="settingsSubmit">Update</button>
                </form>
            </div>
            <SideBar />
        </div>
    )
}
