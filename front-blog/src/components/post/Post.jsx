import "./post.css"

export default function Post() {
    return (
        <div className='post'>
            <img className="postImg" src="https://thumbs.dreamstime.com/b/dirty-music-background-21777451.jpg" alt="" />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eligendi assumenda animi quibusdam iste ex. Praesentium minima, ratione quaerat impedit officia eaque repellendus voluptatum alias dolorum, est iusto enim rem.</p>
        </div>
    )
}
