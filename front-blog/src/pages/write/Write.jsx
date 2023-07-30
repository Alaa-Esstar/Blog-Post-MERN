import { useContext, useEffect, useState } from "react"
import "./write.css"
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context)
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [error, setError] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable

    // Fetch all categories
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!title || !desc || selectedCategories.length === 0) {
            setError("Please fill in all required fields and select at least one category.");
            return;
        }

        const newPost = {
            title,
            desc,
            username: user.username,
            categories: selectedCategories
        };
        setIsPosting(true)
        setError("");
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName)
            data.append("file", file)
            newPost.photo = fileName;
            try {
                await axios.post(`${apiBaseUrl}upload`, data)
            } catch (err) {

            }
        }
        try {
            const res = await axios.post(`${apiBaseUrl}posts`, newPost)
            window.location.replace("/post/" + res.data._id)
        } catch (err) {

        }
    }
    return (
        <div className="write">
            <img src={file ? URL.createObjectURL(file) :
                "./img/default.jpg"
            } alt="" className="writeImg" />
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className=" writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title*" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="writeFormGroup">
                    <label>Select Categories:</label>
                    <ul className="categoryList">
                        {categories.map((category) => (
                            <li
                                key={category._id}
                                onClick={() => {
                                    const categoryName = category.name;
                                    setSelectedCategories((prevCategories) => {
                                        if (prevCategories.includes(categoryName)) {
                                            return prevCategories.filter((name) => name !== categoryName);
                                        } else {
                                            return [...prevCategories, categoryName];
                                        }
                                    });
                                }}
                                className={selectedCategories.includes(category.name) ? "selected" : ""}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story... *" type="text" className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                {error && <p className="error">{error}</p>}
                <button className="writeSubmit" type="submit" disabled={isPosting}>publish</button>
            </form>
        </div>
    )
}
