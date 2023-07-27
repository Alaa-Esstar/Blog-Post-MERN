import "./post.css"
import { Link } from "react-router-dom"

export default function Post({ post }) {
    const PF = process.env.REACT_APP_IMG_URL;
    return (
        <div className='post'>
            <img className="postImg"
                src={post.photo ? PF + post.photo : "./img/default.jpg"}
                alt="" />
            <div className="postInfo">
                <div className="postCats">{
                    post.categories.map(c => (
                        <span className="postCat">{c.name}</span>
                    ))
                }
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    )
}
