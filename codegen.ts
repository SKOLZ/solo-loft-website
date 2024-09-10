import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://sa-east-1.cdn.hygraph.com/content/clzbzosxd01tz07uj6v42ecp4/master",
  require: [],
  documents: "src/services/**/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
