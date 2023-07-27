import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import SideBar from "../../components/sidebar/SideBar"
import "./home.css"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default function Home() {
    const [posts, setPosts] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_URL; // Access the environment variable
    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}posts${search}`);
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [search, apiBaseUrl]);
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    )
}
