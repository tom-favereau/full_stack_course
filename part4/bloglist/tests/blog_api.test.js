const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

beforeAll(() => {
    //jest.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
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

describe('tests POST /api/blogs', () => {
    test('create a new blog and increase the total number of blog', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'mon hamster',
            url: '.fi',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(3)

    })

    test('create and new blog and check content', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'mon hamster',
            url: '.fi',
            likes: 5
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.title).toBe(newBlog.title)
        expect(response.body.author).toBe(newBlog.author)
        expect(response.body.url).toBe(newBlog.url)
        expect(response.body.likes).toBe(newBlog.likes)
    })

    test('create and new blog without likes', async () => {
        const newBlog = {
            title: 'newBlog',
            author: 'mon hamster',
            url: '.fi',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)

    })

    test('no title => 400', async () => {
        const newBlog = {
            author: 'Auteur',
            url: 'link.com',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('no url => 400', async () => {
        const newBlog = {
            title: 'something',
            author: 'Auteur',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})

describe('test DELETE', () => {
    test('decreases total number of blogs', async () => {
        const blogsBefore = await Blog.find({})
        const blogToDelete = blogsBefore[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id.toString()}`)
            .expect(204)

        const blogsAfter = await Blog.find({})
        expect(blogsAfter).toHaveLength(blogsBefore.length - 1)

        const ids = blogsAfter.map(b => b._id.toString())
        expect(ids).not.toContain(blogToDelete._id.toString())
    })

    test('the deleted blog is no longer in the database', async () => {
        const blogsBefore = await Blog.find({})
        const blogToDelete = blogsBefore[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)

        const blogsAfter = await Blog.find({})
        const ids = blogsAfter.map(b => b._id.toString())
        expect(ids).not.toContain(blogToDelete._id.toString())
    })
})

describe('test PUT', () => {
    test('update likes of a blog', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]

        const updatedLikes = blogToUpdate.likes + 10

        const response = await api
            .put(`/api/blogs/${blogToUpdate._id}`)
            .send({ likes: updatedLikes })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(updatedLikes)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
    //console.error.mockRestore()
})
