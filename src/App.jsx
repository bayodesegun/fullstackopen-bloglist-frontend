import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
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

  return user !== null ?
    (<>
      <h2>blogs</h2>
      <h3>
        {user.name} is logged in. &nbsp;
        <button onClick={handleLogout}>logout</button>
      </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>)
    :
    (<>
      <h2>log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username &nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password &nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>)
}

export default App
