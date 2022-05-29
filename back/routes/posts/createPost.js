const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function createPost(fastify, options) {
  fastify.route({
    method: "POST",
    url: "/api/posts",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if(!checkHeaders(req.headers.authorization)) return res.code(401).send('Invalid token')
    const userId = checkTokenUserId(req.headers.authorization);
    const newPost = await prisma.post.create({
      data: {
        content: sanitizer.escape(req.body.content),
        image: req.body.image,
        authorId: userId,
      },
    });
    return "Publication has been published";
  }
}

const response = {
  200: {
    type: "string",
  },
};

const schema = { ...response };

module.exports = createPost;
