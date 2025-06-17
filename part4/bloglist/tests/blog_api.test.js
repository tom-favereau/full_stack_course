const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
        title: '1',
        author: 'A',
        url: '.com',
        likes: 10
    },
    {
        title: '2',
        author: 'B',
        url: '.fr',
        likes: 5
    }
]

let token = null

beforeEach(async () => {
    // Reset DB
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create a test user
    const user = new User({ username: 'testuser', name: 'Test User', passwordHash: 'fakehash' })
    await user.save()

    // Generate token for this user
    const userForToken = {
        username: user.username,
        id: user._id
    }
    token = jwt.sign(userForToken, process.env.SECRET)

    // Insert initial blogs with user reference
    const blogsWithUser = initialBlogs.map(blog => ({ ...blog, user: user._id }))
    await Blog.insertMany(blogsWithUser)
})

describe('GET /api/blogs', () => {
    test('blogs are returned in JSON', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('unique id is called id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.status).toBe(200)
        const blogs = response.body
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('POST /api/blogs', () => {
    test('create a new blog and increase total number', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'mon hamster',
            url: '.fi',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`) // token obligatoire ici
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    })

    test('create a new blog and check content', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'mon hamster',
            url: '.fi',
            likes: 5
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.title).toBe(newBlog.title)
        expect(response.body.author).toBe(newBlog.author)
        expect(response.body.url).toBe(newBlog.url)
        expect(response.body.likes).toBe(newBlog.likes)
    })

    test('create a new blog without likes defaults to 0', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'mon hamster',
            url: '.fi'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('fails with status 400 if title is missing', async () => {
        const newBlog = {
            author: 'Auteur',
            url: 'link.com',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('fails with status 400 if url is missing', async () => {
        const newBlog = {
            title: 'something',
            author: 'Auteur',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('fails with 401 if token is not provided', async () => {
        const newBlog = {
            title: 'blog without token',
            author: 'no token',
            url: 'notoken.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('DELETE /api/blogs/:id', () => {
    test('decreases total number of blogs', async () => {
        const blogsBefore = await Blog.find({})
        const blogToDelete = blogsBefore[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAfter = await Blog.find({})
        expect(blogsAfter).toHaveLength(blogsBefore.length - 1)

        const ids = blogsAfter.map(b => b._id.toString())
        expect(ids).not.toContain(blogToDelete._id.toString())
    })

    test('fails with 401 if token is not provided', async () => {
        const blogsBefore = await Blog.find({})
        const blogToDelete = blogsBefore[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id.toString()}`)
            .expect(401)
    })
})

describe('PUT /api/blogs/:id', () => {
    test('update likes of a blog', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]

        const updatedLikes = blogToUpdate.likes + 10

        const response = await api
            .put(`/api/blogs/${blogToUpdate._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ likes: updatedLikes })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(updatedLikes)
    })

    test('fails with 401 if token is not provided', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate._id.toString()}`)
            .send({ likes: blogToUpdate.likes + 10 })
            .expect(401)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
