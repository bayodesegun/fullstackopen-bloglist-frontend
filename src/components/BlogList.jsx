import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, handleLogout, updateBlog, deleteBlog }) => (
  <div>
    <h2 className='page-header'>blogs</h2>
    <h3 className='logged-in-user'>
      {user.name} is logged in. &nbsp;
      <button onClick={handleLogout}>logout</button>
    </h3>
    <div className='blog-list'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          loggedInUser={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList
