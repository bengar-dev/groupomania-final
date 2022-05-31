const sanitizer = require("sanitizer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");
const prisma = new PrismaClient();

async function getAllCmts(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/api/posts/:id/cmt",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if (!checkHeaders(req.headers.authorization))
      return res.code(401).send("Invalid token");
    const userId = checkTokenUserId(req.headers.authorization);
    const postId = parseInt(req.params.id);
    const findPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!findPost) return res.code(401).send("Publication not found");
    const findComments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            id: true,
            createdAt: true,
            firstname: true,
            lastname: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return findComments;
  }
}

const response = {
  200: {
    type: "array",
    items: {
      type: 'object',
      properties: {
        id: {type: 'number'},
        content: {type: 'string'},
        authorId: {type: 'number'},
        postId: {type: 'number'},
        createdAt: {type: 'string'},
        author: {
          type: 'object',
          properties: {
            id: {type: 'number'},
            createdAt: {type: 'string'},
            firstname: {type: 'string'},
            lastname: {type: 'string'},
            email: {type: 'string'},
            avatar: {type: 'string'}
          }
        }
      }
    }
  },
};

const schema = { ...response };

module.exports = getAllCmts;
