import "./sidebar.css"

export default function SideBar() {
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
                    <li className="sideBarListItem">Life</li>
                    <li className="sideBarListItem">Music</li>
                    <li className="sideBarListItem">Style</li>
                    <li className="sideBarListItem">Tech</li>
                    <li className="sideBarListItem">Sport</li>
                    <li className="sideBarListItem">Tech</li>
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
