import { GraphQLClient } from "graphql-request";

const BUILD_PHASE = "phase-production-build";
const THROTTLE_MS = 250;

let nextRequestAt = 0;

const throttledFetch: typeof fetch = async (input, init) => {
  if (process.env.NEXT_PHASE === BUILD_PHASE) {
    const now = Date.now();
    const wait = Math.max(0, nextRequestAt - now);
    nextRequestAt = Math.max(now, nextRequestAt) + THROTTLE_MS;

    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }

  return fetch(input, init);
};

export const client = new GraphQLClient(process.env.HYGRAPH_BASE_URL, {
  headers: {
    authorization: `bearer ${process.env.HYGRAPH_TOKEN}`,
  },
  fetch: throttledFetch,
});
