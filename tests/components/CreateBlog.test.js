import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from '../../src/components/CreateBlog'

describe('<CreateBlog /> component tests', () => {
  let container
  const createBlog = jest.fn()

  beforeEach(() => {
    container = render(
      <CreateBlog createBlog={createBlog} />
    ).container
  })

  test('renders correctly', async () => {
    const form = container.querySelector('#create-blog-form')
    expect(form).toBeDefined()
    const title = form.querySelector('#new-blog-title')
    const author = form.querySelector('#new-blog-author')
    const url = form.querySelector('#new-blog-url')
    const createBtn = screen.getByText('create')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(createBtn).toBeDefined()
    expect(title.value).toBe('')
    expect(author.value).toBe('')
    expect(url.value).toBe('')
  })

  test('Calls the createBlog handler and clears the field on submit', async () => {
    const user = userEvent.setup()

    const title = container.querySelector('#new-blog-title')
    const author = container.querySelector('#new-blog-author')
    const url = container.querySelector('#new-blog-url')
    const createBtn = screen.getByText('create')

    await user.type(title, 'Title')
    await user.type(author, 'Author')
    await user.type(url, 'www.test.url')
    expect(title.value).toBe('Title')
    expect(author.value).toBe('Author')
    expect(url.value).toBe('www.test.url')
    await user.click(createBtn)

    expect(createBlog).toHaveBeenCalledTimes(1)

    expect(createBlog.mock.calls[0][0].title).toBe('Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.url')

    expect(title.value).toBe('')
    expect(author.value).toBe('')
    expect(url.value).toBe('')
  })
})
