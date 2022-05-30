const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./routes/posts/createPost'))
fastify.register(require('./routes/posts/getAllPosts'))
fastify.register(require('./routes/posts/getPost'))
fastify.register(require('./routes/posts/editPost'))
fastify.register(require('./routes/posts/deletePost'))

fastify.register(require('./routes/users/getAllUsers'))
fastify.register(require('./routes/users/getUser'))
fastify.register(require('./routes/users/createUser'))
fastify.register(require('./routes/users/loginUser'))
fastify.register(require('./routes/users/deleteUser'))
fastify.register(require('./routes/users/editUser'))

const start = async() => {
    try {
        await fastify.listen(3000)
    } catch(error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()