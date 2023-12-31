/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import BlogList from './components/BlogList'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])


  const createBlogRef = useRef(null)

  const showNotification = (message, messageType) => {
    let newMessage = { message, messageType, id: uuidv4() }
    setMessages(messages.concat(newMessage))
  }

  const getUserFromLocalStorage = async () => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }

  const sortBlogsAndUpdate = (_blogs) => {
    _blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(_blogs)
  }

  const getAllBlogs = async () => {
    if (user === null) return
    try {
      const blogs = await blogService.getAll()
      sortBlogsAndUpdate(blogs)
      showNotification('Blogs fetched successfully', 'success')
    } catch (exception) {
      showNotification(`Could not fetch blogs: ${exception}`, 'error')
    }
  }

  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  useEffect(() => {
    getAllBlogs()
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      showNotification('Logged in as ' + user.name, 'success')
    } catch (exception) {
      showNotification(`Error logging in: ${exception.response.data.error}`, 'error')
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
    showNotification('You logged out', 'success')
    setTimeout(() => setMessages([]), 3000)
  }

  const createBlog = async (data) => {
    try {
      const createdBlog = await blogService.create(data, user)
      sortBlogsAndUpdate(blogs.concat({ ...createdBlog, user }))
      showNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success')
    } catch (exception) {
      console.log(exception)
      showNotification(`Error creating blog: ${exception.response.data.error}`, 'error')
    }
    createBlogRef.current.toggleVisibility()
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog, user)
      const newBlogs = blogs.map(b => b.id === blog.id? updatedBlog : b)
      sortBlogsAndUpdate(newBlogs)
      showNotification(`Blog ${blog.title} was liked by ${user.name}`, 'success')
    } catch (exception) {
      showNotification(`Error liking blog: ${exception.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    if (!confirm(`Really delete blog "${blog.title}" by "${blog.author}"?`)) {
      return
    }
    try {
      const deleteBlog = await blogService.remove(blog, user)
      const newBlogs = blogs.filter(b => b.id!== blog.id)
      sortBlogsAndUpdate(newBlogs)
      showNotification(`Blog ${blog.title} was deleted by ${user.name}`, 'success')
    } catch (exception) {
      showNotification(`Error deleting blog: ${exception.response.data.error}`, 'error')
    }
  }

  return <>
    {user !== null ?
      <>
        <BlogList
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
        <Togglable buttonLabel="new blog" ref={createBlogRef}>
          <CreateBlog
            createBlog={createBlog}
          />
        </Togglable>
      </>
      :
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    }
    <br />
    {messages.filter(m => !m.expired).map(m =>
      <Notification
        key={m.id}
        message={m}
      />
    )}
  </>
}

export default App
