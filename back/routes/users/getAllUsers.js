const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");

async function getAllUsers (fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/api/users',
        schema: schema,
        handler: handler
    })

    async function handler(req, res, next) {
        if(!checkHeaders(req.headers.authorization)) return res.code(401).send('Invalid token')
        const users = await prisma.user.findMany({
            select: {
                id: true,
                createdAt: true,
                firstname: true,
                lastname: true,
                email: true,
                avatar: true
            }
        })
        return users
    }
}

const response =  {
    200: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                firstname: {type: 'string'},
                lastname: {type: 'string'},
                email: {type: 'string'},
                avatar: {type: 'avatar'}
            }
        }
    }
}

const schema = { ...response }

module.exports = getAllUsers