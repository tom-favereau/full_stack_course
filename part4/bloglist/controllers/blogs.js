const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (req, res, next) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})


blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor,
    async (req, res, next) => {

        const body = req.body
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(401).json({ error: 'invalid user' })
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

        res.status(201).json(populatedBlog)
    }
)

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(404).json({ error: 'blog not found' })
    }
    if (blog.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'unauthorized: not the blog owner' })
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
    const { likes } = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
        res.json(updatedBlog)
    } else {
        res.status(404).end()
    }
})







module.exports = blogsRouter
