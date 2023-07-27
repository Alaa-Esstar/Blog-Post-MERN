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
                <span className="sideBarTitle">About Me</span>
                <img src="https://www.hardware.com.br/wp-content/uploads/static/wp/2021/04/11/Steve-Jobs.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, accusantium sed. Quod, quam nam non quasi dolores esse ad voluptatibus blanditiis sapiente, vero eligendi debitis ipsa! Impedit hic aliquid assumenda.</p>
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
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                    <i className="sidebarIcon fa-brands fa-square-github"></i>
                </div>
            </div>
        </div>
    )
}
