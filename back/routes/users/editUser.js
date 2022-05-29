const { hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const sanitizer = require('sanitizer')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function editUser (fastify, options) {
    fastify.route({
        method: 'PUT',
        url: '/api/users/:id',
        schema: schema,
        handler: handler
    })

    async function handler(req, res, next) {
        const id = parseInt(req.params.id)
        const findUser = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if(!findUser) return res.code(401).send('User not found')
        const headers =  req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(headers, process.env.TOKEN_KEY)
        const userId = decodedToken.userId
        if(userId !== findUser.id) return res.code(401).send('This is not your profile')
        const editUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                firstname: sanitizer.escape(req.body.firstname),
                lastname: sanitizer.escape(req.body.lastname)
            }
        })
        return 'User has been edited'
    }
}

const response =  {
    200: {
        type: 'string',
    }
}

const schema = { ...response }

module.exports = editUser