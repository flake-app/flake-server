import Fastify, { FastifyInstance } from "fastify";
import fastifyOas from "fastify-oas";
import { usersRoutes } from "./routes/users/users";

const app = Fastify();

app.register(fastifyOas, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'flake api docs',
      description: 'rest api',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  },
  exposeRoute: true,
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
