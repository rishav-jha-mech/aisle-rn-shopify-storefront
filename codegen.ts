import type { CodegenConfig } from '@graphql-codegen/cli';

// mock.shop serves the public Storefront API schema, so codegen runs without credentials.
const config: CodegenConfig = {
  schema: 'https://mock.shop/api',
  documents: ['src/api/operations/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    'src/api/gql/': {
      preset: 'client',
      presetConfig: { fragmentMasking: false },
      config: {
        useTypeImports: true,
        documentMode: 'string',
        enumsAsTypes: true,
        scalars: {
          URL: 'string',
          HTML: 'string',
          DateTime: 'string',
          Decimal: 'string',
          JSON: 'unknown',
          Color: 'string',
          UnsignedInt64: 'string',
        },
      },
    },
  },
};

export default config;
