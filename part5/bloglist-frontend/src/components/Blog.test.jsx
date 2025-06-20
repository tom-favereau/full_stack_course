import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: {
            username: 'user1',
            name: 'User One',
        }
    }

    test('renders title and author by default', () => {
        render(<Blog blog={blog} />)
        expect(screen.getByText(/React patterns/i)).toBeInTheDocument()
        expect(screen.getByText(/Michael Chan/i)).toBeInTheDocument()
        const urlElement = screen.queryByText(/https:\/\/reactpatterns.com/i)
        expect(urlElement).not.toBeInTheDocument()
        const likesElement = screen.queryByText(/likes/i)
        expect(likesElement).not.toBeInTheDocument()
    })

    test('renders url and likes when view is clicked', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        expect(screen.getByText(blog.url)).toBeInTheDocument()
        expect(screen.getByText(/likes/i)).toBeInTheDocument()
    })

    test('like click twice => function call twice', async () => {
        const mockLikeHandler = jest.fn()
        const user = userEvent.setup()
        render(
            <Blog blog={blog} onLike={mockLikeHandler} />
        )
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockLikeHandler).toHaveBeenCalledTimes(2)
    })
})
