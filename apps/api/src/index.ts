import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = `
  type Query {
    hello: String
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    age: Int!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello GraphQL!",
    user: (_: any, { id }: { id: string }) => ({
      id,
      name: "Taro",
      age: 30,
    }),
  },
};

const schema = createSchema({ typeDefs, resolvers });
const graphqlServer = createYoga({ schema });

const app = new Hono();

app.all("/graphql", async (c) => {
  return await graphqlServer.fetch(c.req.raw);
});

serve(app);
