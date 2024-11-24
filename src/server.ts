import Fastify, { FastifyInstance } from "fastify";
import swagger from 'fastify-swagger';
import { usersRoutes } from "./routes/users/users";

const app = Fastify();

// TODO: need to fix swagger UI for api docs
app.register(swagger, {
  routePrefix: '/api-docs',
  swagger: {
    info: {
      title: 'Users API',
      description: 'API for managing users',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  },
});

// healthcheck
async function healthCheck(fastify: FastifyInstance) {
  fastify.get("/healthcheck", async (_, reply) => {
    reply.send({ status: "OK" });
  });
}

// routes
app.register(healthCheck);
app.register(usersRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`Server is running at ${address}`);
});
