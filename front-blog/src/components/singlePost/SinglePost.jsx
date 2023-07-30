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
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]); // Step 1: State to manage selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${apiBaseUrl}posts/${path}`);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setSelectedCategories(res.data.categories);
        }
        getPost();
    }, [path, apiBaseUrl])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}categories`);
                setCategories(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
    }, [apiBaseUrl]);

    const handleDelete = async () => {
        await axios.delete(`${apiBaseUrl}posts/${path}`, {
            data: { username: user.username }
        })
        window.location.replace("/");
    }
    const handleUpdate = async () => {
        setError("")
        if (!title || !desc || selectedCategories.length === 0) {
            setError("Please fill in all required fields and select at least one category.");
            return;
        }
        let updatedData = {
            username: user.username,
            title,
            desc,
            categories: selectedCategories,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            try {
                await axios.post(`${apiBaseUrl}upload`, data);
                updatedData.photo = fileName;
            } catch (err) {
                console.log(err);
            }
        }
        await axios.put(`${apiBaseUrl}posts/${path}`, updatedData);
        setUpdateMode(false);
        setError("")
    }

    const handleCategoryChange = (category) => {
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newSelectedCategories);
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img src={file ? file === "../img/default.jpg" ? "../img/default.jpg" : URL.createObjectURL(file) :
                    post.photo ? PF + post.photo : "../img/default.jpg"
                } alt="" className="singlePostImg" />
                {updateMode && (
                    <div className="inputFileGroup">
                        <label htmlFor="file" className="singlePostFileInputLabel">Change Image <i className="fa-solid fa-upload"></i></label>
                        <input type="file" name="" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} accept="image/*" />
                        <p onClick={() => setFile("../img/default.jpg")}>Delete Image <i className="fa-regular fa-circle-xmark"></i></p>
                    </div>
                )}
                {
                    updateMode ?
                        <input type="text" value={title} className="singlePostTitleInput" autoFocus={true}
                            onChange={(e) => setTitle(e.target.value)} />
                        : (
                            <h1 className="singlePostTitle">
                                {title}
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
                        <span style={{ "margin-left": "20px" }}>
                            Categories:
                        </span>
                        {categories.map((category) => (
                            selectedCategories.includes(category.name) && (
                                <Link to={`/?cat=${category.name}`} className="link">
                                    <strong><span key={category._id} className="singlePostCategoryName">{category.name}</span></strong>
                                </Link>
                            )
                        ))}
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> : <p className="singlePostDesc">{desc}</p>}
                {updateMode && (
                    <div className="singlePostCategories">
                        {categories.map((category) => (
                            <label key={category._id} className="singlePostCategoryLabel">
                                <input
                                    type="checkbox"
                                    value={category.name}
                                    checked={selectedCategories.includes(category.name)}
                                    onChange={() => handleCategoryChange(category.name)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                )}
                {updateMode &&
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                }
                {error && <p className="error">{error}</p>}
            </div>
        </div >
    )
}
