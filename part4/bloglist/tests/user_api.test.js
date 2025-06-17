const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
            username: 'tom',
            passwordHash: '123'
        })
    await user.save()
})

describe('POST user creation', () => {

    test('fails if username is missing', async () => {
        const newUser = {
            name: 'A',
            password: '123'
        }

        const response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.body.error).toMatch(/username.*required/i)
    })

    test('fails if password is missing', async () => {
        const newUser = {
            username: 'ABC',
            name: 'A'
        }

        const response = await api.post('/api/users').send(newUser).expect(400)
    })

    test('fails if username is shorter than 3 chars', async () => {
        const newUser = {
            username: 'A',
            name: 'A',
            password: '123'
        }

        await api.post('/api/users').send(newUser).expect(400)
        //expect(response.body.error).toMatch(/username.*at least 3 characters/i)
    })

    test('fails if password is shorter than 3 chars', async () => {
        const newUser = {
            username: 'ABC',
            name: 'A',
            password: '12'
        }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('fails if username is not unique', async () => {
        const newUser = {
            username: 'tom',
            name: 'tom',
            password: '123'
        }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('succeeds with valid username and password', async () => {
        const newUser = {
            username: 'emma',
            name: 'emma',
            password: '123'
        }

        const response = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

        expect(response.body.username).toBe(newUser.username)
        expect(response.body.password).not.toBeDefined()

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(2)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

})

afterAll(() => {
    mongoose.connection.close()
})
