const sanitizer = require("sanitizer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { checkHeaders, checkTokenUserId } = require("../../plugins/auth");

async function getOnePost(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/api/posts/:id",
    schema: schema,
    handler: handler,
  });
  // à continuer
  async function handler(req, res, next) {
    if (!checkHeaders(req.headers.authorization)) return res.code(401).send("Invalid token");
    const id = parseInt(req.params.id);
    const findPost = await prisma.post.findUnique({
      where: {
        id,
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
    if(!findPost) return res.code(401).send('Publication not found')
    return findPost;
  }
}

const response = {
  200: {
    type: "object",
    properties: {
      id: "number",
      content: "string",
      image: "string",
      userArray: "string",
      authorId: "number",
      createdAt: "string",
      author: "object",
    },
  },
};

const schema = { ...response };

module.exports = getOnePost;
