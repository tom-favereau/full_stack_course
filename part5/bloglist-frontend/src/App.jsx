import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import ErrorMessage from "./components/ErrorMessage"
import SuccessMessage from "./components/SuccessMessage.jsx"
import Togglable from './components/Togglable'
import { useRef } from 'react'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setsuccessMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const initialize = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    initialize()
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setsuccessMessage('Successfully login')
      setTimeout(() => setsuccessMessage(null), 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
      console.error('login failed', exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    setsuccessMessage('Successfully logout')
    setTimeout(() => setsuccessMessage(null), 5000)
  }
  const handleCreateBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      //const updatedBlogs = await blogService.getAll() solved in the backend instead
      //setBlogs(updatedBlogs)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setsuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => setsuccessMessage(null), 5000)
    } catch (error) {
      setErrorMessage('failed to create blog')
      setTimeout(() => setErrorMessage(null), 5000)
      console.error('fail', error)
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = await blogService.like(blog)
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setsuccessMessage(`Blog "${blog.title}" removed`)
      setTimeout(() => setsuccessMessage(null), 5000)
    } catch (error) {
      setErrorMessage('Failed to remove blog (maybe you are not the owner)')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }


  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage}/>
      <h2>blogs</h2>
      {user === null
          ? <LoginForm onLogin={handleLogin} />
          : (
              <div>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                <Togglable buttonLabelActivate="add blog" buttonLabelDesactivate="cancel" ref={blogFormRef}>
                  <BlogForm onCreate={handleCreateBlog} />
                </Togglable>
                {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            onLike={handleLike}
                            onRemove={handleRemove}
                            user={user}
                        />
                    ))}
              </div>
          )
      }
    </div>
  )
}

export default App