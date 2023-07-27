import { useContext, useState } from "react"
import "./write.css"
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context)

    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username
        };
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
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story..." type="text" className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">publish</button>
            </form>
        </div>
    )
}
