import { useLocation, Link } from "react-router-dom"
import "./singlePost.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../../context/Context"

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable
    const [post, setPost] = useState({});
    const PF = process.env.REACT_APP_IMG_URL
    const { user } = useContext(Context)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${apiBaseUrl}posts/${path}`);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost();
    }, [path, apiBaseUrl])

    const handleDelete = async () => {
        await axios.delete(`${apiBaseUrl}posts/${path}`, {
            data: { username: user.username }
        })
        window.location.replace("/");
    }
    const handleUpdate = async () => {
        await axios.put(`${apiBaseUrl}posts/${path}`, {
            username: user.username, title, desc
        })
        window.location.reload();
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img src={post.photo ? PF + post.photo : "../img/default.jpg"} alt="" className="singlePostImg" />
                {
                    updateMode ?
                        <input type="text" value={title} className="singlePostTitleInput" autoFocus={true}
                            onChange={(e) => setTitle(e.target.value)} />
                        : (
                            <h1 className="singlePostTitle">
                                {post.title}
                                {post.username === user?.username && (
                                    <div className="singlePostEdit">
                                        <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                        <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                    </div>
                                )}
                            </h1>
                        )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> : <p className="singlePostDesc">{post.desc}</p>}
                {updateMode &&
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                }
            </div>
        </div>
    )
}
