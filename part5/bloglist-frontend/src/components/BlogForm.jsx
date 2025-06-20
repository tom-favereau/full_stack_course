import { useState } from 'react'

const BlogForm = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onCreate({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>create new blog</h3>
            <div>
                <label>
                title:
                <input
                    id="title"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                author:
                <input
                    id="author"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                url:
                <input
                    id="url"
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
                </label>
            </div>
            <button id="create-button" type="submit">create</button>
        </form>
    )
}

export default BlogForm
