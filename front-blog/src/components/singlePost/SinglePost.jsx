import "./singlePost.css"

export default function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img src="https://thumbs.dreamstime.com/b/dirty-music-background-21777451.jpg" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet consectetur
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
                        <i className="singlePostIcon fa-solid fa-trash-can"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author: <b>Alaa</b></span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>
                <p className="singlePostDesc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quibusdam reprehenderit! Beatae, eligendi placeat nesciunt aliquam, dignissimos cum nam quasi repellat voluptas accusantium fugit. Aut soluta error cupiditate iusto earum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quibusdam reprehenderit! Beatae, eligendi placeat nesciunt aliquam, dignissimos cum nam quasi repellat voluptas accusantium fugit. Aut soluta error cupiditate iusto earum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quibusdam reprehenderit! Beatae, eligendi placeat nesciunt aliquam, dignissimos cum nam quasi repellat voluptas accusantium fugit. Aut soluta error cupiditate iusto earum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quibusdam reprehenderit! Beatae, eligendi placeat nesciunt aliquam, dignissimos cum nam quasi repellat voluptas accusantium fugit. Aut soluta error cupiditate iusto earum.
                </p>

            </div>
        </div>
    )
}
