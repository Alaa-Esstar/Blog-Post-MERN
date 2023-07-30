import { useEffect, useState } from "react"
import "./sidebar.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar() {
    const [cats, setCats] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get(`${apiBaseUrl}categories`)
            setCats(res.data);
        }
        getCats();
    }, [apiBaseUrl])
    return (
        <div className="sidebar">
            <div className="sideBarItem">
                <span className="sideBarTitle">About The Project</span>
                <img src="https://e1.pxfuel.com/desktop-wallpaper/243/6/desktop-wallpaper-mern-stack-bloggerboy-mern-stack.jpg" alt="" />
                <p>
                    A MERN blog app is a web application that lets users read, write, edit, and delete blog posts. It uses MongoDB for data storage, Express.js for handling server-side logic,
                    React.js for building the user interface, and Node.js for server-side runtime. Users can create accounts, publish posts, and interact with others.
                    The app offers an intuitive and responsive platform for sharing thoughts and ideas with a community of readers.
                </p>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">Categories</span>
                <ul className="sideBarList">
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
                            <li className="sideBarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">Follow Us</span>
                <div className="sideBarSocial">
                    <Link to={"https://www.facebook.com/Digostastar"} target="_blanck">
                        <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    </Link>
                    <Link to={"https://github.com/Alaa-Esstar"} target="_blank">
                        <i className="sidebarIcon fa-brands fa-square-github"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}
