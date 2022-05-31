const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function editPost(fastify, options) {
  fastify.route({
    method: "PUT",
    url: "/api/posts/:postid/cmt/:cmtid",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if(!checkHeaders(req.headers.authorization)) return res.code(401).send('Invalid token')
    const userId = checkTokenUserId(req.headers.authorization);
    const postid = parseInt(req.params.postid)
    const cmtid = parseInt(req.params.cmtid)
    const findPost = await prisma.post.findUnique({
      where:{
        id: postid
      }
    })
    if(!findPost) return res.code(401).send('Publication not found')
    const findCmt = await prisma.comment.findUnique({
        where:{
            id: cmtid
        }
    })
    if(!findCmt) return res.code(401).send('Comment not found')
    if(findCmt.authorId !== userId) return res.code(401).send('This is not your comment')
    const editCmt = await prisma.comment.update({
      where: {
        id: cmtid
      },
      data: {
        content: sanitizer.escape(req.body.content)
      }
    })
    return "Comment has been edited";
  }
}

const response = {
  200: {
    type: "string",
  },
};

const schema = { ...response };

module.exports = editPost;
