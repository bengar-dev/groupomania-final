const sanitizer = require('sanitizer')
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
        const newPost = await prisma.post.create({
            data: {
                content: req.body.content,
                image: req.body.image,
                authorId: req.body.authorId
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