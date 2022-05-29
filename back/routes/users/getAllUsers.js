const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllUsers (fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/api/users',
        schema: schema,
        handler: handler
    })

    async function handler() {
        const users = await prisma.user.findMany()
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