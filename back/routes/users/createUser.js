const { hashSync, compareSync } = require('bcrypt')
const sanitizer = require('sanitizer')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser (fastify, options) {
    fastify.route({
        method: 'POST',
        url: '/api/users/signup',
        schema: schema,
        handler: handler
    })

    async function handler(req, res, next) {
        const hash = hashSync(req.body.password, 10)      
        const newUser = await prisma.user.create({
            data: {
                firstname: sanitizer.escape(req.body.firstname),
                lastname: sanitizer.escape(req.body.lastname),
                email: req.body.email,
                password: hash
            }
        })
        return 'User registered'
    }
}

const response =  {
    200: {
        type: 'string',
    }
}

const schema = { ...response }

module.exports = createUser