const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function editPost(fastify, options) {
  fastify.route({
    method: "PUT",
    url: "/api/posts/:id",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if(!checkHeaders(req.headers.authorization)) return res.code(401).send('Invalid token')
    const userId = checkTokenUserId(req.headers.authorization);
    const id = parseInt(req.params.id)
    const findPost = await prisma.post.findUnique({
      where:{
        id
      }
    })
    if(!findPost) return res.code(401).send('Publication not found')
    if(findPost.authorId !== userId) return res.code(401).send('This is not your publication')
    const editPost = await prisma.post.update({
      where: {
        id
      },
      data: {
        content: sanitizer.escape(req.body.content)
      }
    })
    return "Publication has been edited";
  }
}

const response = {
  200: {
    type: "string",
  },
};

const schema = { ...response };

module.exports = editPost;
