import Togglable from "./Togglable.jsx"
import {useState} from "react"


const Blog = ({ blog, onLike, onRemove, user }) => {
    const [view, setView] = useState(false)

    const handleLike = () => {
        onLike(blog)
    }

    const handleRemove = () => {
        onRemove(blog)
    }



    if (view){
        return (
            <div className="blog" id={`blog-${blog.title}`}>
                <div >
                    <span>{blog.title}</span>
                        <button onClick={() => setView(false)}>hide</button>
                        <div><a href={blog.url}>{blog.url}</a></div>
                    <div>
                        likes: <span id="like-count">{blog.likes}</span>
                        <button id="like-button" onClick={handleLike}>like</button>
                    </div>
                    <div>{blog.user.username}</div>
                        <div>
                            {user.username===blog.user.username
                                ? <button onClick={handleRemove}>remove</button>
                                : null
                            }
                        </div>
                </div>
            </div>
        )
    }
    return (
        <div className="blog" id={`blog-${blog.title}`}>
            <div >
                <span>{blog.title} {blog.author}</span>
                <button onClick={() => setView(true)}>view</button>
            </div>
        </div>
    )
}

export default Blog