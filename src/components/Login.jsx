const Login = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <div>
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
  </div>
)

export default Login
