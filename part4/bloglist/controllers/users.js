const usersRouter = require('express').Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const bcrypt = require("bcrypt")

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})

    const usersWithBlogs = await Promise.all(users.map(async (elem) => {
        const blogs = await Blog.find({ user: elem._id })
        return {
            blogs: blogs.map(blog => ({
                url: blog.url,
                title: blog.title,
                author: blog.author,
                id:blog.id
            })),
            username: elem.username,
            name: elem.name,
            id:elem.id
        }
    }))
    res.json(usersWithBlogs)
})

usersRouter.post('/', async (req, res) => {
    const saltRounds = 10
    if (!req.body.password) {
        return res.status(400).json({error: 'password is required'})
    }
    if (req.body.password.length < 3){
        return res.status(400).json({error: 'password is required to have length at least 3'})
    }
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        passwordHash: await bcrypt.hash(req.body.password, saltRounds)
    })
    res.status(201).json(await user.save())
})

module.exports = usersRouter
