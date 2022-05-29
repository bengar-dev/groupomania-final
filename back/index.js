const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./routes/users/getAllUsers'))
fastify.register(require('./routes/users/createUser'))

const start = async() => {
    try {
        await fastify.listen(3000)
    } catch(error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()