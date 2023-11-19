import { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const getUserFromLocalStorage = async () => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    getUserFromLocalStorage()
    getAllBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username)
    const user = await loginService.login({
      username,
      password
    })
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    const createdBlog = await blogService.create(newBlog, user)
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return user !== null ?
    (<>
      <BlogList
        blogs={blogs}
        user={user}
        handleLogout={handleLogout}
      />
      <CreateBlog
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        createBlog={createBlog}
      />
    </>)
    :
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
}

export default App
