const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function deleteOnePost(fastify, options) {
  fastify.route({
    method: "DELETE",
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
    const deletePost = await prisma.post.delete({
      where: {
        id
      }
    })
    return "Publication has been deleted";
  }
}

const response = {
  200: {
    type: "string",
  },
};

const schema = { ...response };

module.exports = deleteOnePost;
