import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedInUser, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const likeBlog = async (blog) => {
    const _blog = { ...blog }
    _blog.likes += 1
    if (_blog.user) _blog.user = _blog.user.id
    updateBlog(_blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      { !showDetails ?
        (<div>
          {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>view</button>
        </div>
        )
        :
        (<div>
          <div>{blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button></div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={() => likeBlog(blog)} >like</button> </div>
          <div>{blog.user ? blog.user.name : ''}</div>
          { blog.user && blog.user.username === loggedInUser.username ?
            (<button onClick={() => deleteBlog(blog)}>remove</button>) : ''
          }
        </div>
        )
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
