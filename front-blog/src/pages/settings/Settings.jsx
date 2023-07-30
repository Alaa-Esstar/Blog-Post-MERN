import "./settings.css"
import SideBar from "../../components/sidebar/SideBar"
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSucess] = useState(false);
    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable
    const PF = process.env.REACT_APP_IMG_URL; // Access the environment variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        const oldUsername = user.username;
        console.log("username before", user.username)
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            ...(username && { username }), // Only include the username field if it's not empty
            ...(email && { email }), // Only include the email field if it's not empty
            ...(password && { password }), // Only include the password field if it's not empty
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName)
            data.append("file", file)
            updatedUser.profilePicture = fileName;
            try {
                await axios.post(`${apiBaseUrl}upload`, data)
            } catch (err) {

            }
        }
        try {
            const res = await axios.put(`${apiBaseUrl}users/${user._id}`, updatedUser)
            setSucess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" })
        }

        console.log("username after", user.username)
        // Update the username of the posts associated with the user
        if (username && oldUsername !== username) {
            console.log(oldUsername, username)
            try {
                await axios.put(`${apiBaseUrl}posts/update-username/${oldUsername}`, { username });
            } catch (err) {
                // Handle error if updating post usernames fails
            }
        }
    }
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle">Delete account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePicture} alt="" />
                        <label htmlFor="fileInput">
                            <i className="seetingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="..." onChange={e => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span className="settingsSuccess">Profile has been updated</span>}
                </form>
            </div>
            <SideBar />
        </div>
    )
}
