const sanitizer = require('sanitizer')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllPosts (fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/api/posts',
        schema: schema,
        handler: handler
    })
    // à continuer
    async function handler(req, res, next) {      
        const findPosts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        createdAt: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        })
        return findPosts
    }
}

const response =  {
    200: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: 'number',
                content: 'string',
                image: 'string',
                userArray: 'string',
                authorId: 'number',
                createdAt: 'string',
                author: 'object'
            }
        }
    }
}

const schema = { ...response }

module.exports = getAllPosts