import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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
        </div>
        )
      }
    </div>
  )
}

export default Blog
