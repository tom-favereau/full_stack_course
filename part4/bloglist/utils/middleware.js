const jwt = require('jsonwebtoken')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' })
    }

    return res.status(500).json({ error: 'Internal server error' })
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    if (!req.token) {
        return res.status(401).json({ error: 'token missing' })
    }

    try {
        req.user = jwt.verify(req.token, process.env.SECRET);
        if (!req.user.id) {
            return res.status(401).json({ error: 'invalid token' })
        }
    } catch (error) {
        return res.status(401).json({ error: 'token invalid' })
    }

    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
