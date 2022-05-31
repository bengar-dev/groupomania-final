const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function createCmt(fastify, options) {
  fastify.route({
    method: "POST",
    url: "/api/posts/:id/cmt",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if(!checkHeaders(req.headers.authorization)) return res.code(401).send('Invalid token')
    const userId = checkTokenUserId(req.headers.authorization);
    const postId = parseInt(req.params.id)
    const findPost = await prisma.post.findUnique({
        where:{
            id: postId
        }
    })
    if(!findPost) return res.code(401).send('Publication not found')
    const newComment = await prisma.comment.create({
      data: {
        content: sanitizer.escape(req.body.content),
        authorId: userId,
        postId
      },
    });
    return "Comments has been published";
  }
}

const response = {
  200: {
    type: "string",
  },
};

const schema = { ...response };

module.exports = createCmt;
