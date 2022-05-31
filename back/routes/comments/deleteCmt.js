const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function deleteOneCmt(fastify, options) {
  fastify.route({
    method: "DELETE",
    url: "/api/posts/:id/cmt",
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
    const findCmt = await prisma.comment.findUnique({
      where:{
        id: parseInt(req.body.cmtId)
      }
    })
    if(!findCmt) return res.code(401).send('Comment not found')
    if(userId !== findCmt.authorId) return res.code(401).send('This is not your comment')
    const delCmt = await prisma.comment.delete({
        where:{
            id: parseInt(req.body.cmtId)
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

module.exports = deleteOneCmt;
