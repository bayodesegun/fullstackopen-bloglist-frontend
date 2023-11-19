const CreateBlog = ({ title, author, url, setTitle, setAuthor, setUrl, createBlog }) => (
  <div>
    <h2>create new</h2>
      <form onSubmit={createBlog}>
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

export default CreateBlog
