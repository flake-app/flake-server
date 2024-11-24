import Fastify, { FastifyInstance } from "fastify";
import fastifyOas from "fastify-oas";
import { usersRoutes } from "./routes/users/users";
import { eventsRoutes } from "./routes/events/events";
import { userEventsRoutes } from "./routes/user-events/user-events";

const app = Fastify();

// Fastify Open API
// TODO: This actually has been deprecated and is no longer being updated
// If someone can update this to fastify-swagger, that would be dope 👍
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

// Healthcheck
const statusSchema = {
  description: "Get status",
  tags: ["Status"],
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string" },
      },
    },
  },
} as const;

async function healthCheck(fastify: FastifyInstance) {
  fastify.get("/healthcheck", {
    schema: statusSchema as any,
  }, async (_, reply) => {
    reply.send({ status: "OK ✅" });
  });
}

// Routes
app.register(healthCheck);
app.register(usersRoutes);
app.register(eventsRoutes);
app.register(userEventsRoutes)

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server is running at ${address}`);
});
