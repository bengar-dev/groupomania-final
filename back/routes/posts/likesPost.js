const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function createPost(fastify, options) {
  fastify.route({
    method: "POST",
    url: "/api/posts/:id/likes",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if(!checkHeaders(req.headers.authorization)) return res.code(401).send('Invalid token')
    const userId = checkTokenUserId(req.headers.authorization);
    const id = parseInt(req.params.id)
    const findPost = await prisma.post.findUnique({
        where: {
            id
        }
    })
    if(!findPost) return res.code(401).send('Publication not found')
    const parsedUserArray = JSON.parse(findPost.userArray)
    const findUser = parsedUserArray.findIndex(p => p === userId)
    if(findUser === -1) parsedUserArray.push(userId)
    else {
        parsedUserArray.splice(findUser, 1)
    }
    const editLikes = await prisma.post.update({
        where: {
            id
        },
        data: {
            userArray: JSON.stringify(parsedUserArray)
        }
    })
    return 'Publication liked/unliked';
  }
}

const response = {
  200: {
    type: "string",
  },
};

const schema = { ...response };

module.exports = createPost;
