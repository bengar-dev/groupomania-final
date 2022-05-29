const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getOneUser(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/api/users/:id",
    schema: schema,
    handler: handler,
  });

  async function handler(req, res, next) {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
          id: true,
          createdAt: true,
          firstname: true,
          lastname: true,
          email: true,
          avatar: true
      }
    });
    return user;
  }
}

const response = {
  200: {
    type: "object",
    properties: {
      id: { type: "number" },
      firstname: { type: "string" },
      lastname: { type: "string" },
      email: { type: "string" },
      avatar: { type: "avatar" },
    },
  },
};

const schema = { ...response };

module.exports = getOneUser;
