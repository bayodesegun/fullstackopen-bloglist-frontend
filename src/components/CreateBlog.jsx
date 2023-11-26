import { useState } from 'react'

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
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={submitBlog}>
          <div>
            title &nbsp;
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author &nbsp;
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url &nbsp;
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default CreateBlog
