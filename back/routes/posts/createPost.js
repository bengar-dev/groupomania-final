const sanitizer = require('sanitizer')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createPost (fastify, options) {
    fastify.route({
        method: 'POST',
        url: '/api/posts',
        schema: schema,
        handler: handler
    })
    // à continuer
    async function handler(req, res, next) {      
        const headers =  req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(headers, process.env.TOKEN_KEY)
        const userId = decodedToken.userId
        const newPost = await prisma.post.create({
            data: {
                content: sanitizer.escape(req.body.content),
                image: req.body.image,
                authorId: userId
            }
        })
        return 'Publication has been published'
    }
}

const response =  {
    200: {
        type: 'string',
    }
}

const schema = { ...response }

module.exports = createPost