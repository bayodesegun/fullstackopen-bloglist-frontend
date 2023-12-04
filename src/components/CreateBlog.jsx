import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitBlog} id='create-blog-form'>
        <div>
            title &nbsp;
          <input
            type="text"
            value={title}
            name="Title"
            id="new-blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author &nbsp;
          <input
            type="text"
            value={author}
            name="Author"
            id="new-blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url &nbsp;
          <input
            type="text"
            value={url}
            name="Url"
            id="new-blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlog
