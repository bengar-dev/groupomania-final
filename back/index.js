const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./routes/users/getAllUsers'))
fastify.register(require('./routes/users/getUser'))
fastify.register(require('./routes/users/createUser'))
fastify.register(require('./routes/users/loginUser'))

const start = async() => {
    try {
        await fastify.listen(3000)
    } catch(error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()