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

  beforeEach(() => {
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
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
})
