const { hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const sanitizer = require('sanitizer')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function loginUser (fastify, options) {
    fastify.route({
        method: 'POST',
        url: '/api/users/signin',
        schema: schema,
        handler: handler
    })

    async function handler(req, res, next) {
        const email = sanitizer.escape(req.body.email)
        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!findUser) return res.code(401).send('User not found')
        if(!compareSync(req.body.password, findUser.password)) return res.code(401).send('Password invalid')
        const token = jwt.sign(
            {userId: findUser.id},
            process.env.TOKEN_KEY,
            {expiresIn: '24h'}
        )
        return {
            id: findUser.id,
            token
        }
    }
}

const response =  {
    200: {
        type: 'object',
        properties: {
            id: {type: 'number'},
            token: {type: 'string'},
        }
    }
}

const schema = { ...response }

module.exports = loginUser