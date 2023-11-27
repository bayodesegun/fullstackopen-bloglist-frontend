import Blog from './Blog'

const BlogList = ({ blogs, user, handleLogout, updateBlog }) => (
  <div>
    <h2>blogs</h2>
    <h3>
      {user.name} is logged in. &nbsp;
      <button onClick={handleLogout}>logout</button>
    </h3>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={updateBlog}
      />
    )}
  </div>
)

export default BlogList
