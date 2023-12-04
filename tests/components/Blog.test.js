import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'

describe('<Blog /> component tests', () => {
  let container
  let blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      username: 'username',
      name: 'name'
    }
  }
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} loggedInUser={blog.user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    ).container
  })

  test('only title and author are displayed by default', () => {
    const overview = container.querySelector('.blog-overview')
    expect(overview).toBeDefined()
    expect(overview.textContent).toBe('title author view')

    const details = container.querySelector('.blog-details')
    expect(details).toBe(null)
  })

  test('after clicking the "view" button, blog details are displayed', async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)

    let overview = container.querySelector('.blog-overview')
    expect(overview).toBeNull()

    let details = container.querySelector('.blog-details')
    expect(details).toBeDefined()
    expect(details.textContent).toBe('title author hideurl0 likes like nameremove')

    const hideBtn = screen.getByText('hide')
    await user.click(hideBtn)
    overview = container.querySelector('.blog-overview')
    details = container.querySelector('.blog-details')
    expect(overview).toBeDefined()
    expect(overview.textContent).toBe('title author view')
    expect(details).toBeNull()
  })

  test('clicking the like button calls the updateBlog event handler', async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)

    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })


})
