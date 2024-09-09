import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.HYGRAPH_BASE_URL!, {
  headers: {
    authorization: `bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});
